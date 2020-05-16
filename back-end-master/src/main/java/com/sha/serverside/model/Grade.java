package com.sha.serverside.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
@Table(name="grade")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @Column(name="grade")
    private String grade;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="assignment_id", referencedColumnName = "id")
    private Assignment assignment;
}