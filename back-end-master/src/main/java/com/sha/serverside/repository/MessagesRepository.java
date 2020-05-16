package com.sha.serverside.repository;
import com.sha.serverside.model.Messages;
import com.sha.serverside.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessagesRepository extends JpaRepository<Messages, Long>{
    List<Messages> findByCid(Long convoid);
}
