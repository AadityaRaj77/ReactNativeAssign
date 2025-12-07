# Darely – React Native (Expo) Assignment

A simple mobile app that displays daily challenges, shows full challenge details, and allows creating new challenges.  
Built using **Expo + React Native**, following the assignment requirements.

---

## 📂 Project Structure

```
src/
  components/
    ChallengeCard.jsx
  screens/
    CreateChallengesScreen.jsx
    DetailsScreen.jsx
    HomeScreen.jsx
  data/
    challenges.json
  navigation/
    StackNavigator.jsx
App.jsx
README.md
```

---

## ⚙️ Setup Steps

### 1. Clone the project

```sh
git clone https://github.com/your-username/ReactNativeAssign.git
cd frontend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Install Expo-supported versions

```sh
npx expo install react-native-reanimated react-native-gesture-handler
npx expo install expo-linear-gradient
```

### 4. Start the app

```sh
npx expo start
```

Press:

- `a` → Android
- `w` → Web
- `i` → iOS (Mac only)

---

## ✔️ Features Implemented

### Home Screen

- Shows list of challenges
- Pull-to-refresh
- Tap to view details
- Newly created challenge jumps to the top
- Last opened challenge also moves to top
- “+ Create” button

### Challenge Details Screen

- Title
- Full description
- Category
- Difficulty
- “Accept Challenge” button

### Create Challenge Screen

- Enter title, description, category
- Challenge saved in AsyncStorage
- Marked as “last opened” automatically
- Appears instantly on top of the list

### Data Handling

- Base challenges from `/src/data/challenges.json`
- User-created challenges stored in AsyncStorage
- Last opened timestamps stored in AsyncStorage

---

## 🎨 UI Theme

- Dark background
- Neon minimilism theme (Electric Blue + Hot Magenta)
- Gradient action buttons
- Animated press effects

---

## 📸 Screenshots

![alt text](image-1.png)
![alt text](image-3.png)
![alt text](image-2.png)

---
