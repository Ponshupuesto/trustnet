import Text "mo:base/Text";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Float "mo:base/Float";
import MembersModule "MembersModule";

module ProjectModule {

    public type Project = {
        id: Text; //ID único del proyecto (Tal vez usar consecutivo más el UUID de la comunidad p.e. 03766bd9-ac95-41b8-a972-d18624ab0fd5-9)
        name: Text; //Nombre del proyecto
        description: Text; //Text
        goal: Text; //Meta principal del proyecto
        isVoteConditioned: Bool; //Si está on el voto es condicionado a fondeo (Si miembro dona alloweVoters), de lo contrario está off
        conditionReason: Text; //Opt 1: Penalized User
        allowedVoters: List.List<MembersModule.Member>; //Lista de varios Member
        projectType: ProjectType; //Tipo de proyecto
        phase: Phase;
        gathersResources: Bool; //Si está habilitada, el proyecto recaba recursos, se consumen recursos de la cuenta general.
        targetAmmount: Float; //Fondos disponibles (bolsa general), sólo disponible si gatherResources es true, de lo contrario siempre 0.0
    };

    public type ProjectType {
        #SingleVoting; 
        #SharedMilestone;
        #MilestoneAchievement;
    };

    public type Phase {
        #Posted; 
        #VotingPeriod;
        #Approved;
        #Rejected;
        #Initated;
        #WaitingForApproval;
        #InProgress;
        #Withdrawn;
        #Completed;
        #Canceled;
    };
};
