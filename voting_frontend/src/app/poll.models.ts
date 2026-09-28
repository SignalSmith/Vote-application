export interface Poll {
    id ?: number ; 
    question : string ; 
    options : optionVote[] ; 
}

export interface optionVote {
     voteOption : string ;
     count : number ;
}
