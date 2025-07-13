import Text "mo:base/Text";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Float "mo:base/Float";
import Int64 "mo:base/Int64";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import MembersModule "MembersModule";

module CommunityModule {

    public type Community = {
        id : Int; //ID único de comunidad (Tal vez usar un UUID)
        name : Text; //Nombre de la comunidad (¿Estableceremos largo por default?)
        creator : Principal; //Temporal para Pruebas
        members : List.List<MembersModule.Member>; //Lista de varios Member, debería inicializarse por defecto con el creador de la comunidad
        isActive : Bool; //Comunidad activa (Pensado para casos en que deba desactivarse el account, si es que se va a trabajar bajo fees)
        gathersResources: Bool; //Si está habilitada, la comunidad recaba recursos, esto es para la cuenta principal, no de proyecto. De ser false available funds debería mostrar 0 en el front
        availableFunds: Float; //Fondos disponibles (bolsa general), sólo disponible si gatherResources es true, de lo contrario siempre 0.0
        isLongTerm: Bool; //De único proyecto o a largo plazo
        allowConditionedVote: Bool; //Permite condicionar el voto de participantes dentro de los proyectos
        voteTransferAllowed: Bool; //Se permite transfarencia de votos dentro de la comunidad
        minimumVotingWindow: Int64; //Tiempo mínimo de votación por proyecto por defecto en minutos
    };

};
