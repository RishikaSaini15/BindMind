package com.sha.serverside.service;

import com.sha.serverside.model.Conversations;
import com.sha.serverside.model.Messages;
import com.sha.serverside.repository.ConversationRepository;
import com.sha.serverside.repository.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {

    Conversations sideLoad;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessagesRepository messagesRepository;

    @Override
    public List<Conversations> getConversationsByUserID(Long userId) {
        return conversationRepository.findByUserId(userId);
    }

    @Override
    public List<Conversations> getConversations2ByUserID(Long userId) {
        return conversationRepository.findByRecepId(userId);
    }

    @Override
    public List<Messages> getConversation(Long convoid) {
        return messagesRepository.findByCid(convoid);
    }

    @Override
    public Optional<Conversations> getConversationMeta(Long convoid) {
        return conversationRepository.findById(convoid);
    }

    @Override
    public Messages saveMessage(Messages message) {
        return messagesRepository.save(message);
    }

    @Override
    public Conversations saveConversation(Conversations conversations) {

        sideLoad = conversationRepository.save(conversations);

        Messages firstMessage = new Messages();
        firstMessage.setCid(sideLoad.getId());
        firstMessage.setText(sideLoad.getFirstmessage());
        firstMessage.setTimestamp(sideLoad.getTimestamp());
        firstMessage.setUser(sideLoad.getUser());
        firstMessage.setRecep(sideLoad.getRecep());

        messagesRepository.save(firstMessage);

        return sideLoad;
    }


}
