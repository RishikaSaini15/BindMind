package com.sha.serverside.service;

import com.sha.serverside.model.Conversations;
import com.sha.serverside.model.Messages;


import java.util.List;
import java.util.Optional;

public interface MessageService {
    List<Conversations> getConversationsByUserID(Long userId);
    List<Conversations> getConversations2ByUserID(Long userId);
    List<Messages> getConversation(Long convoid);
    Optional<Conversations> getConversationMeta(Long convoid);
    Messages saveMessage(Messages message);
    Conversations saveConversation(Conversations conversations);
}
