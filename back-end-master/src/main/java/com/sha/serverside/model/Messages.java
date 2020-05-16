package com.sha.serverside.model;


import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="messages")
public class Messages implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user", referencedColumnName = "id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="recep", referencedColumnName = "id")
    private User recep;

    @Column(name="text")
    private String text;

    @Column(name="timestamp")
    private Timestamp timestamp;

    @Column(name="cid")
    private Long cid;



}
