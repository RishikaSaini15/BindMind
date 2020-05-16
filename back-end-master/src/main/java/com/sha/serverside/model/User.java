package com.sha.serverside.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private Role role;


    @Column(name="user_description")
    private String user_description;

    @Column(name="first_name")
    private String first_name;

    @Column(name="last_name")
    private String last_name;

    @Column(name="gender")
    private String gender;

    @Column(name="address")
    private String address;

    @Column(name="mobile")
    private Long mobile;

    @Column(name="city")
    private String city;

    @Column(name="state")
    private String state;

    @Column(name="zipcode")
    private Long zipcode;

    @Column(name="country")
    private String country;




    @Transient
    private String token;
}
