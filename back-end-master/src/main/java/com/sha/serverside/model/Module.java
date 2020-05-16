package com.sha.serverside.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Blob;

@Data
@Entity
@Table(name="module")
public class Module implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="course_id", referencedColumnName = "id")
    private Course course;
}
