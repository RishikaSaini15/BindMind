package com.sha.serverside.model;



import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="comments")
public class Comments implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="postid")
    private Long postId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user", referencedColumnName = "id")
    private User userID;

    @Column(name="body")
    private String body;

    @Column(name="timestamp")
    private Timestamp timestamp;
}
