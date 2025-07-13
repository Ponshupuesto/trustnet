/*
Single Votes:
	1) Posted
	2) VotingPeriod
	3) ApprovalDefined (true = Aprobado, false = Declinado)+
	SI SE APRUEBA
		4) Approved (aprobado, pero no cobrado)
		5) Withdrawn (cobrado, pero no finalizado o comprobado)
		6) Completed (finalizado o comprobado)
	SI NO SE APRUEBA
		4) Rejected
FIN

SharedMilestone:
	1) Posted
	2) VotingPeriod
	Si SE APRUEBA
		4) Approved (aprobado, pero no cobrado)
		5) Withdrawn (cobrado)
		Si todos los milestones están completed:
			6) Completed
		Si algún milestone no está completed:
			6) InProgress
		7) Completed
	SI NO SE APRUEBA
		4) Rejected
	FIN

MilestoneAchievement:
	1) Posted
	2) VotingPeriod
	Si se aprueba:
		3) Aprobado (aprobado, pero no cobrado)
		4) Withdrawn (cobrado)
		Pasará por estos flujos si hay más milestones:
			5) WaitingForApproval
			Si se aprueba
				6) Withdrawan
				*Si hay otro milestone vuelve al 5
				Si es último milestone al completarse se actualiza el estatus:
				7) Completed
			Si no se aprueba:
			7) Canceled
	Si no se aprueba:
		3) Rejected
	FIN
*/