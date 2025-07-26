import Text "mo:base/Text";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Float "mo:base/Float";
import Int64 "mo:base/Int64";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import CommunityModule "modules/CommunityModule";
import MembersModule "modules/MembersModule";
import UsersModule "modules/UsersModule";
import Result "mo:base/Result";
import Blob "mo:base/Blob";
import Option "mo:base/Option";
import Hex "utils/Hex";
import Ledger "canister:icp_ledger_canister";

actor Manager {

  stable var userID = 0;
  stable var userEntries : [(Principal, UsersModule.User)] = [];
  let users = HashMap.HashMap<Principal, UsersModule.User>(0, Principal.equal, Principal.hash);

  stable var communityID = 0;
  stable var communityEntries : [(Int, CommunityModule.Community)] = [];
  //stable var communities = List.nil<CommunityModule.Community>();
  let communities = HashMap.fromIter<Int, CommunityModule.Community>(
    communityEntries.vals(),
    Iter.size(communityEntries.vals()),
    Int.equal,
    Int.hash,
  );

  public shared ({ caller }) func addUser(
    displayName : Text,
    bio : ?Text,
    location : ?Text,
    email : ?Text,
    phone : ?Text,
    website : ?Text,
    twitter : ?Text,
    linkedin : ?Text,
    github : ?Text,

    showEmail : ?Bool,
    showPhone : ?Bool,
    showLocation : ?Bool,
    showWebsite : ?Bool,
    showTwitter : ?Bool,
    showLinkedin : ?Bool,
    showGithub : ?Bool,

    allowMessages : ?Bool,
    photo : ?Blob,

    offeredServices : ?List.List<Text>,
  ) : async Result.Result<(), Text> {
    switch (users.get(caller)) {
      case (null) {
        let newUser : UsersModule.User = {
          id = caller;
          displayName = displayName;
          bio = Option.get(bio, "");
          location = Option.get(location, "");
          email = Option.get(email, "");
          phone = Option.get(phone, "");
          website = Option.get(website, "");
          twitter = Option.get(twitter, "");
          linkedin = Option.get(linkedin, "");
          github = Option.get(github, "");

          showEmail = Option.get(showEmail, false);
          showPhone = Option.get(showPhone, false);
          showLocation = Option.get(showLocation, false);
          showWebsite = Option.get(showWebsite, false);
          showTwitter = Option.get(showTwitter, false);
          showLinkedin = Option.get(showLinkedin, false);
          showGithub = Option.get(showGithub, false);

          allowMessages = Option.get(allowMessages, true);
          photo = photo;

          isActive = true;
          communities = List.nil();
          offeredServices = Option.get(offeredServices, List.nil());
          createdAt = Time.now();
        };
        users.put(caller, newUser);
        return #ok();
      };
      case (?_) {
        return #err("Member already exists");
      };
    };
  };

  public shared ({ caller }) func getProfile() : async Result.Result<UsersModule.User, Text> {
    switch (users.get(caller)) {
      case (?user) {
        return #ok(user);
      };
      case (null) {
        return #err("Profile not found");
      };
    };
  };

  public query func getAllUsers() : async [UsersModule.User] {
    return Iter.toArray(users.vals());
  };

  public shared ({ caller }) func createCommunity(
    argName : Text,
    argMembers : List.List<MembersModule.Member>,
    argIsActive : Bool,
    argGathersResources : Bool,
    argAvailableFunds : Float,
    argIsLongTerm : Bool,
    argConditionedVote : Bool,
    argVoteTransferAllowed : Bool,
    argMinimunVotingWindow : Int64,
  ) : async Text {

    communityID += 1;

    let community : CommunityModule.Community = {
      id = communityID;
      name = argName;
      creator = caller;
      members = argMembers;
      isActive = argIsActive;
      gathersResources = argGathersResources;
      availableFunds = argAvailableFunds;
      isLongTerm = argIsLongTerm;
      allowConditionedVote = argConditionedVote;
      voteTransferAllowed = argVoteTransferAllowed;
      minimumVotingWindow = argMinimunVotingWindow;
    };
    //communities := List.push(community, communities);
    communities.put(communityID, community);
    "Created community " #community.name # " with ID: " # Int.toText(community.id);
  };

  //Retorna todas las comunidades dentro del canister
  public query func getCommunities() : async [(Int, CommunityModule.Community)] {
    let entries : [(Int, CommunityModule.Community)] = Iter.toArray(communities.entries());

    let sortedEntries = Array.sort<(Int, CommunityModule.Community)>(
      entries,
      func(
        a : (Int, CommunityModule.Community),
        b : (Int, CommunityModule.Community),
      ) : Order.Order {
        Int.compare(a.1.id, b.1.id);
      },
    );

    return sortedEntries;
  };

  //Recibe el Id de la comunidad y retorna las configuraciones (todas las props, menos miembros)
  public query func getCommunitySettings(id : Int) : async ?CommunityModule.Community {
    communities.get(id);
  };

  //Recibe el Id de la comunidad y retorna los miembros
  public query func getCommunityMembers(id : Int) : async ?CommunityModule.Community {
    communities.get(id);
  };

  //Recibe comunidad y actualiza las props ()
  public func updateCommunity(community : CommunityModule.Community) : async Text {
    "Se actualizaron las props";
  };

  public shared ({ caller }) func deleteCommunity(communityID : Int) : async Result.Result<(), Text> {
    switch (communities.get(communityID)) {
      case (null) {
        return #err("Community doesnt exist");
      };
      case (?community) {
        let creatorPrincipal = community.creator;
        if (Principal.equal(caller, creatorPrincipal)) {
          communities.delete(communityID);
          return #ok();
        } else {
          return #err("You arent the creator.");
        };
      };
    };
  };

  system func preupgrade() {
    communityEntries := Iter.toArray<(Int, CommunityModule.Community)>(communities.entries());
    userEntries := Iter.toArray<(Principal, UsersModule.User)>(users.entries());
  };

  system func postupgrade() {
    communityEntries := [];
    userEntries := [];
  };

  //Ledger Funcs

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  public query func getAccount() : async Text {
    let acctId = Principal.toLedgerAccount(Principal.fromActor(Manager), ?Blob.fromArray(Array.freeze(Array.init<Nat8>(32, 0))));
    "Your Account is " # Hex.encode(Blob.toArray(acctId)) # "!";
  };

  public func getBalanceFromActor() : async Nat64 {
    let accountId = Principal.toLedgerAccount(Principal.fromActor(Manager), ?Blob.fromArray(Array.freeze(Array.init<Nat8>(32, 0))));
    let result = await Ledger.account_balance_dfx({
      account = Hex.encode(Blob.toArray(accountId));
    });
    return result.e8s;
  };

  public shared ({ caller }) func getBalanceFromCaller() : async Nat64 {
    let accountId = Principal.toLedgerAccount(caller, ?Blob.fromArray(Array.freeze(Array.init<Nat8>(32, 0))));
    let result = await Ledger.account_balance_dfx({
      account = Hex.encode(Blob.toArray(accountId));
    });
    return result.e8s;
  };

};
