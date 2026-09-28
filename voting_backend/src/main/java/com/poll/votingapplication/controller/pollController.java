package com.poll.votingapplication.controller;


import com.poll.votingapplication.DTO.Vote;
import com.poll.votingapplication.model.poll;
import com.poll.votingapplication.service.pollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/poll")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class pollController {

     private final pollService pollService ;

    @PostMapping("/create")
    public poll createPoll(@RequestBody poll poll){
        return pollService.createPoll(poll) ;
    }

    @GetMapping("/get/polls")
    public List<poll> getAllPolls(){
        return pollService.getAllPolls() ;
    }

    @GetMapping("/{id}")
    public ResponseEntity<poll> getPollById(@PathVariable Long id){
        return pollService.getPollById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()) ;
    }

    @PostMapping("/vote")
    public void VotePls(@RequestBody Vote vote ){
         pollService.votehere(vote.getPollId() , vote.getPollOptions());
    }

    @DeleteMapping("{id}/delete")
    public void deletePoll(@PathVariable Long id){
        pollService.deletePoll(id) ;
    }

}
