package com.poll.votingapplication.service;

import com.poll.votingapplication.model.poll;
import com.poll.votingapplication.model.voteCount;
import com.poll.votingapplication.repository.pollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class pollService {
     private final pollRepository pollRepository ;

    public poll createPoll(poll poll) {
        return pollRepository.save(poll) ;
    }

    public List<poll> getAllPolls() {
       List<poll> allpolls =  pollRepository.findAll() ;
       return allpolls ;
    }

    public Optional<poll> getPollById(Long id) {
       return pollRepository.findById(id) ;
    }


    public void votehere(Long pollId, int pollOptions) {
        //get poll from db
        // get all options
        //if index is not valid then throw error
        //get selected option
        //Increment vote for selected option

         poll thePoll = pollRepository.findById(pollId).orElseThrow( ()->new RuntimeException("Not found ID "));
          List<voteCount> allOptions =  thePoll.getOptions() ;

          if(pollOptions < 0 || pollOptions >= allOptions.size()){
              throw new IllegalArgumentException("Not a valid option");
          }

          voteCount selectedOptions = allOptions.get(pollOptions) ;
          selectedOptions.setCount(selectedOptions.getCount()+1) ;

           pollRepository.save(thePoll) ;

    }

    public void deletePoll(Long id) {
        pollRepository.deleteAllById(Collections.singleton(id));
    }
}
