package com.sha.serverside.service;

import com.sha.serverside.model.User;
import com.sha.serverside.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User findByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user){


        User userFromDB= userRepository.findByUsername(user.getUsername()).get();
        userFromDB.setName(user.getName());
        userFromDB.setState(user.getState());
        userFromDB.setAddress(user.getAddress());
        userFromDB.setCity(user.getCity());
        userFromDB.setCountry(user.getCountry());
        userFromDB.setFirst_name(user.getFirst_name());
        userFromDB.setLast_name(user.getLast_name());
        userFromDB.setGender(user.getGender());
        userFromDB.setMobile(user.getMobile());
        userFromDB.setUser_description(user.getUser_description());
        userFromDB.setZipcode(user.getZipcode());
        return userRepository.save(userFromDB);






        //return userRepository.save(user);
    }
}
