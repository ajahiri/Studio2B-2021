import React /*, { useEffect, useState }*/ from 'react';      /* HN */ 
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Settings } from 'react-native'; /* no need for ScrollView (I guess) */

/* please excuse all my comments here, it's just to help me remember what they do :)) [comments may noot be accurate] */

/* const TeacherDashboard = () => { */
export default function TeacherDashboard({ navigation}) {
/* I'm not sure how to refer the Welcome _______ to user */
  return(
    <SafeAreaView>                                       
    <View style={styles.logcontainter}>       
      <TouchableOpacity                   /* TouchableOpacity allows that thing where it dims the text when clicked on */
        style={styles.logoutbutton}          
      >
        <Text style={styles.logout}>Logout</Text>       
      </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <View style={styles.welContainer}>
        <Text style={styles.welcome}>Welcome Elon</Text>
      </View>

      <TouchableOpacity
        style={styles.stuContainer}
      >
        <Text style={styles.students}>Students</Text>
      </TouchableOpacity>
     
      <TouchableOpacity
         style={styles.classContainer}
      >
        <Text style={styles.classes}>Classes</Text>
       </TouchableOpacity>

      <TouchableOpacity
        style={styles.setContainer}
      >
        <Text style={styles.settings}>Settings</Text>
      </TouchableOpacity>
    
     <TouchableOpacity
        style={styles.reportContainer}
     >
        <Text style={styles.report}>Report a problem</Text>
     </TouchableOpacity>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* logcontainer: { }, */

  logoutbutton:{      /* I don't know if this is needed */
  
  },

  logout: {
    marginLeft: 290,  /* These Margin Functions help in moving the logout button around the screen to where you'd like. They also help with adjusting the size of the boxes horizontally (left and right margins) */
    marginRight: 10,
   /* marginBottom: */
    marginTop: -5,
    /* padding: 10, */
    paddingVertical: 3,   /* expands box vertically ++ */
    borderWidth: 1,       /* border thiccness*/
    borderColor: "#20232a",   /* color of box border (blacc) */
    /* borderRadius: 3, */
    backgroundColor: "#3D3ABF",  /* colour of box (blue - keshi) */
    color: "#FFFFFF",   /* color of the font (white) */
    textAlign: "center",  /* Makes the text centred*/
    fontSize: 12,   /* font size for "Logout" */
    fontWeight: "bold",     /* Makes the font in bold */
  },
  
  container: {
    alignItems: "center"
    
  },

  title: {
    fontSize: 25,
    marginTop: 20
  },

  welContainer: {
    alignItems: "center"
  },

  welcome: {
    fontSize: 25,
    marginTop: 40,
    fontWeight: "bold"
  },

  stuContainer: {
  },

  students: {
     marginLeft: 20,
     marginRight: 210,
     marginTop: 100,
     borderWidth: 1,
     paddingVertical: 60,
     paddingHorizontal: 30,
     backgroundColor: "#a7a7ab",
     textAlign: "center"
  },

  classContainer: {
     alignItems: "flex-end"
  },

  classes: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: -139,
    borderWidth: 1,
    paddingVertical: 60,
    paddingHorizontal: 45,
    backgroundColor: "#a7a7ab",
    textAlign: "center"
  },

  setContainer: {

  },

  settings: {
    marginTop: 40,
    marginRight: 113,
    marginLeft: 113,
    paddingVertical: 60,
    borderWidth: 1,
    backgroundColor: "#a7a7ab",
    textAlign: "center"
  },
  
  reportContainer: {
      alignItems: "flex-end"   /* Puts the text on the right side */
  },
  
  report: {
      fontSize: 13,
      marginRight: 4,
      marginTop: 150
  }

});

/*export default TeacherDashboard; */