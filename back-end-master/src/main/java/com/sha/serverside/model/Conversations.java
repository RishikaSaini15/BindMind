package com.sha.serverside.model;


import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="conversation")
public class Conversations implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="recep_id", referencedColumnName = "id")
    private User recep;

    @Column(name="topic")
    private String topic;

    @Column(name="timestamp")
    private Timestamp timestamp;

    @Column(name="firstmessage")
    private String firstmessage;

}
