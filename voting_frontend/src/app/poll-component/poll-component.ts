import { ChangeDetectorRef, Component } from '@angular/core';
import { PollService } from '../poll-service';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll-component',
  imports: [CommonModule , FormsModule],
  templateUrl: './poll-component.html',
  styleUrl: './poll-component.css',
})
export class PollComponent {

  newPoll : Poll = {
        question : "" , 
        options : [
          {voteOption : "" ,count : 0}
        ]
  } ; 
    
   polls : Poll[] = []   ; 
   
  constructor(private pollservice : PollService , private cd : ChangeDetectorRef) {}

  ngOnInit() :void {
     this.loadAllPolls() ; 
  }

   loadAllPolls(){
    this.pollservice.getPolls().subscribe({
      next : (data)  => {
        this.polls = data ;
        console.warn("the poll is " , this.polls) ; 
        this.cd.detectChanges() ;
      },
      error : (error) =>{
         console.error("Status:", error.status);
    console.error("Message:", error.message);
    console.error("URL:", error.url);
    console.error("Error:", error.error);
      }
    })
   }
    
    createPoll() {
      if(this.newPoll.options.some(option => option.voteOption.trim() === "")){
        alert("Please enter valid options !!") ; 
        return ; 
      }
        this.pollservice.createPoll(this.newPoll).subscribe({
          next : (createdPoll) =>{
            this.polls.push(createdPoll) ; 
            alert("Poll is created successfully ") ; 
          },
          error : (error) =>{
            console.warn("failed to create poll" ,error) ; 
          }
        });
    }  

    addOption() {
        this.newPoll.options.push({voteOption : "" ,count : 0}) ; 
    }


    vote(  id : number , index : number) {
       this.pollservice.vote(id, index).subscribe({
          next : ()=>{
            const poll = this.polls.find(p => p.id === id)
            if(poll){
            poll.options[index].count++ ; 
            this.cd.detectChanges() ;
            }
          },
          error : (error) => {
             console.warn("poll is not voted", error) ; 
          }
       }) ; 
    }

     deletePoll(pollId : number){
          this.pollservice.deletePoll(pollId).subscribe({
             next : () =>{
              this.polls = this.polls.filter(p => p.id !== pollId) ; 
              alert("poll deleted succesfully") ; 
              this.cd.detectChanges() ;
             },
             error :(error) =>{
              console.warn("fail to delete the poll" , error) ; 
             }
          }) ; 
     }


   trackByIndex(index : number) {
    return index ; 
   }
}
