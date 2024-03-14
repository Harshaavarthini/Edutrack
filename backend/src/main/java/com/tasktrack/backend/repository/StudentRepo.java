package com.tasktrack.backend.repository;

import com.tasktrack.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepo extends JpaRepository<Student, String> {


    Optional<Student> findByEmail(String email);
}
