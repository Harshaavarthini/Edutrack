package com.tasktrack.backend.repository;

import com.tasktrack.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {



    List<Task> findAllByStudentId(String id);

    @Query(nativeQuery = true, value = "update task set pending='Completed' where task_id=:taskId")
    @Modifying
    @Transactional
    void updatePending(Long taskId);


    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM task t WHERE t.deadline <= CURRENT_DATE + INTERVAL '2 DAY' AND t.student_id = :id")
    int getDeadline( String id);


}
