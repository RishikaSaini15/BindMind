package com.sha.serverside.model;


import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="discussions")
public class Discussions implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="post_by", referencedColumnName = "id")
    private User userID;

    @Column(name="post_title")
    private String title;

    @Column(name="post_description")
    private String body;

    @Column(name="post_date")
    private Timestamp timestamp;

}
