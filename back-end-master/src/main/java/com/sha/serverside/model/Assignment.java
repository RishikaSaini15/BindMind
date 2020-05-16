package com.sha.serverside.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name="assignment")
public class Assignment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="start_date")
    private Date startDate;

    @Column(name="end_date")
    private Date endDate;

    @Column(name="file")
    private String file;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="module_id", referencedColumnName = "id")
    private Module module;
}
