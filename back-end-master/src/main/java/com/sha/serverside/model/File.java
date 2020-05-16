package com.sha.serverside.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
@Table(name="file")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="upload_date")
    private Date date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="uploaded_by", referencedColumnName = "id")
    private User uploadedBy;

    @Column(name="file")
    private String file;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="assignment_id", referencedColumnName = "id")
    private Assignment assignment;
}
