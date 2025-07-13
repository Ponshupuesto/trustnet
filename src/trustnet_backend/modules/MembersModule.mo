import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";
import T "mo:base/Time";



module MembersManager{
    public type Member = {
        id: Text; //Principal del Miembro
        joinedAt: T.Time; //Hora de creación del miembro
        canVote: Bool; //Si puede votar
        isCommitee: Bool; //Si es del comité
        sharesVote: Bool; //Si el voto está cedido
        beneficial: Text; //Principal del beneficiario
        projects: Text; //Lista de Projectos
    };
};