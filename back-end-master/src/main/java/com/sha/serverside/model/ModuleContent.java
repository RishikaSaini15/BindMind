package com.sha.serverside.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Blob;
@Data
@Entity
@Table(name="module_content")
public class ModuleContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="video_link")
    private String video;

    @Column(name="video_title")
    private String videoTitle;

    @Column(name="transcript")
    private String transcript;

    @Column(name="file")
    private String file;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="module_id", referencedColumnName = "id")
    private Module module;
}
