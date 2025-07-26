import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Time "mo:base/Time";
import Int "mo:base/Int";
import CommunityModule "CommunityModule";


module UsersModule{
public type User = {
    id: Principal;
    displayName: Text;
    bio: Text;
    location: Text;
    email: Text;
    phone: Text;
    website: Text;
    twitter: Text;
    linkedin: Text;
    github: Text;

    showEmail: Bool;
    showPhone: Bool;
    showLocation: Bool;
    showWebsite: Bool;
    showTwitter: Bool;
    showLinkedin: Bool;
    showGithub: Bool;

    allowMessages: Bool;

    photo: ?Blob; // Imagen opcional como blob

    isActive: Bool;
    communities: List.List<Int>; // IDs de comunidades
    offeredServices: List.List<Text>; // Servicios ofrecidos
    createdAt: Time.Time;
};
};