import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import Note from '../Note/Note';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        }
    }


    addNote(){
        if(this.state.noteText!==''){
            let d=new Date();
            this.state.noteArray.push({
                'date':d.getFullYear()+
                "/"+(d.getMonth()+1)+
                "/"+d.getDate(),
                'note':this.state.noteText
            });
            this.setState({noteArray:this.state.noteArray});
            this.setState({noteText:''});

        }
    }

    deleteNote(key){
        this.state.noteArray.splice(key,1);
        this.setState({noteArray:this.state.noteArray});
    }

    render() {
        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val}
                deleteMethod={() => this.deleteNote(key)}
                />
        });


        return (
            <View style={styles.container}>
                <View style={styles.header} >
                    <Text style={styles.headerText} >
                        TODOs
                    </Text>
                </View>

                <ScrollView style={styles.scrollContainer} >
                    {notes}
                </ScrollView>
                <KeyboardAvoidingView behavior="padding">
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText)=>this.setState({noteText})}
                        value={this.state.noteText}
                        placeholder=">Write a TODO..."
                        placeholderTextColor="white"
                        underlineColorAndroid="transparent"

                    >
                    </TextInput>

                </KeyboardAvoidingView>

                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton} >
                    <Text style={styles.addButtonText} >+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#3b5998',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom:0,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 80,
        backgroundColor: 'green',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 50,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,

    }
});