import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types"; // Adjust the path according to your project structure
import { FontAwesome } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

interface Comment {
  id: string;
  userName: string;
  comment: string;
}

const commentsData: Comment[] = [
  { id: "1", userName: "Commenter One", comment: "This is a comment." },
  { id: "2", userName: "Commenter Two", comment: "This is another comment." },
  // Add more comments as needed
];

type CommentsScreenRouteProp = RouteProp<RootStackParamList, "Comments">;

const CommentsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<CommentsScreenRouteProp>();
  const { post } = route.params;

  const [comment, setComment] = useState("");

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUserName}>{item.userName}</Text>
      <Text style={styles.commentText}>{item.comment}</Text>
    </View>
  );

  const onSwipeLeft = () => {
    navigation.navigate("home");
  };

  const handleSendComment = () => {
    if (comment.trim() !== "") {
      // Add logic to send the comment
      console.log("Sending comment:", comment);
      setComment(""); // Clear the comment input after sending
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onSwipeLeft}>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={
              <View style={styles.postContainer}>
                <View style={styles.userContainer}>
                  <Image
                    source={{ uri: post.userImage }}
                    style={styles.userImage}
                  />
                  <View>
                    <Text style={styles.userName}>{post.userName}</Text>
                    <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                  </View>
                </View>
                <Text style={styles.postText}>{post.postText}</Text>
                <Image
                  source={{ uri: post.postImage }}
                  style={styles.postImage}
                />
                <View style={styles.postStats}>
                  <View style={styles.statsLeft}>
                    <FontAwesome name="eye" size={20} style={styles.statIcon} />
                    <Text style={styles.statText}>{post.views}</Text>
                    <FontAwesome
                      name="heart"
                      size={20}
                      style={styles.statIcon}
                    />
                    <Text style={styles.statText}>{post.likes}</Text>
                    <FontAwesome
                      name="comment"
                      size={20}
                      style={styles.statIcon}
                    />
                    <Text style={styles.statText}>{post.comments}</Text>
                  </View>
                  <FontAwesome
                    name="share"
                    size={20}
                    style={styles.shareIcon}
                  />
                </View>
              </View>
            }
            data={commentsData}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.commentsContainer}
          />
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Type your comment..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendComment}
            >
              <FontAwesome name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsContainer: {
    padding: 10,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeAgo: {
    fontSize: 12,
    color: "gray",
  },
  postText: {
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  postStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  statsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    marginRight: 5,
    color: "gray",
  },
  statText: {
    marginRight: 15,
    fontSize: 14,
    color: "gray",
  },
  shareIcon: {
    color: "gray",
  },
  commentContainer: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
  },
  commentUserName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
