package com.poll.votingapplication.repository;

import com.poll.votingapplication.model.poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface pollRepository  extends JpaRepository<poll , Long> {
}
