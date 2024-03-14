package com.tasktrack.backend.entity;


import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskCsvRepresentation {

    @CsvBindByName(column = "taskName")
    private String taskName;
    @CsvBindByName(column = "deadline")
    @CsvDate(value = "yyyy-MM-dd")
    private LocalDate deadline;
    @CsvBindByName(column = "studentName")
    private String studentName;
    @CsvBindByName(column = "studentId")
    private String studentId;
    @CsvBindByName(column = "pending")
    private String pending;
}
