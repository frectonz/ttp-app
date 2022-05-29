import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./Home";
import AboutScreen from "./About";
import { StoreProvider } from "./store";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Truth Table Parser">
          <Drawer.Screen name="Truth Table Parser" component={HomeScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
