package com.poll.votingapplication.model;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class voteCount {
    private String voteOption ;
    private Long count  = 0L ;
}
