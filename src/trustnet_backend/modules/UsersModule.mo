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
        name: Text; 
        emailAddress: Text;
        isActive: Bool;
        communities: List.List<Int>; // Guardar el ID de la comunidad 
        offeredServices: List.List<Text>;
        createdAt: Time.Time;
    };
};