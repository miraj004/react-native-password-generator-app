import React from 'react';
import { Image, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Icon, ListItem, Button, Avatar } from '@rneui/themed';

const chatData = [
  { name: 'Angel Curtis', message: 'Please help me find a good monitor for t...', time: '02:11', Image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Zaire Dorwart', message: 'Gacor pisan kang', time: '02:11', Image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'Kelas Malam', message: 'Bima: No one can come today?', time: '02:11', Image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { name: 'Jocelyn Gouse', message: 'You\'re now an admin', time: '02:11', Image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Jaylon Dias', message: 'Buy back 10k gallons, top up credit, b...', time: '02:11', Image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'Chance Rhiel Madsen', message: 'Thank you mate!', time: '02:11', Image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { name: 'Livia Dias', message: 'Thank you!', time: '02:11', Image: 'https://randomuser.me/api/portraits/women/3.jpg' },
];

const ChatView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mengobrol</Text>
      </View>
      <ScrollView horizontal style={styles.storiesContainer} showsHorizontalScrollIndicator={false}>
        <View style={styles.story}>
          <Avatar rounded containerStyle={styles.addStory} />
          <Text style={styles.storyName}>Add story</Text>
        </View>
        <View style={styles.story}>
           <Image style={{height: 35, width: 35, borderRadius: 100}} source={{ uri: 'https://randomuser.me/api/portraits/women/4.jpg' }} />
          <Text style={styles.storyName}>Terry</Text>
        </View>
        <View style={styles.story}>
           <Image style={{height: 35, width: 35, borderRadius: 100}}   source={{ uri: 'https://randomuser.me/api/portraits/men/5.jpg' }} />
          <Text style={styles.storyName}>Craig</Text>
        </View>
        <View style={styles.story}>
           <Image style={{height: 35, width: 35, borderRadius: 100}}   source={{ uri: 'https://randomuser.me/api/portraits/men/6.jpg' }} />
          <Text style={styles.storyName}>Roger</Text>
        </View>
        <View style={styles.story}>
           <Image style={{height: 35, width: 35, borderRadius: 100}}   source={{ uri: 'https://randomuser.me/api/portraits/women/5.jpg' }} />
          <Text style={styles.storyName}>Nolan</Text>
        </View>
      </ScrollView>
      <ScrollView style={styles.chatsContainer}>
        {chatData.map((chat, index) => (
          <ListItem key={index} bottomDivider>
             <Image style={{height: 35, width: 35, borderRadius: 100}}   source={{ uri: chat.Image }} />
            <ListItem.Content>
              <ListItem.Title>{chat.name}</ListItem.Title>
              <ListItem.Subtitle>{chat.message}</ListItem.Subtitle>
            </ListItem.Content>
            <View style={styles.chatTime}>
              <Text style={styles.chatTimeText}>{chat.time}</Text>
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>2</Text>
              </View>
            </View>
          </ListItem>
        ))}
      </ScrollView>
      <View style={styles.newChatButtonContainer}>
        <Button
          title="New Chat"
          buttonStyle={styles.newChatButton}
        
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  storiesContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  story: {
    alignItems: 'center',
    marginRight: 16,
    height: 50
  },
  storyName: {
    marginTop: 4,
    fontSize: 12,
  },
  addStory: {
    backgroundColor: '#ddd',
  },
  chatsContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  chatTime: {
    alignItems: 'flex-end',
  },
  chatTimeText: {
    fontSize: 12,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#ffab00',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginTop: 2,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
  newChatButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  newChatButton: {
    backgroundColor: '#000',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ChatView;
