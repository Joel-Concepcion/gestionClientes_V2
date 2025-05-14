import { StyleSheet, View, Text, Alert, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';


import React, {useState} from 'react';
//import React from "react";


import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from "@react-navigation/native";

export default function Settings(){
    const navigation = useNavigation();
    const [cedula, setCedula] = useState("");
    const [nombre, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fechaNacimiento, setfechaNacimiento] = useState("");
    const [sexo, setSexo] = useState("");

    const [Clientes, setClientes] = useState([]);

   const formatCedula = (text) => {
    let cleaned = text.replace(/[^0-9A-Za-z]/g, "");
    if (cleaned.length > 14) return text;  
    if (cleaned.length > 3 && cleaned[3] !== "-") {
        cleaned = cleaned.slice(0, 3) + "-" + cleaned.slice(3);
    }
    if (cleaned.length > 10 && cleaned[10] !== "-") {
        cleaned = cleaned.slice(0, 10) + "-" + cleaned.slice(10);
    }
    return cleaned.toUpperCase();
};


    const formatFecha = (text) => {
        let cleaned = text.replace(/[^0-9-]/g, "");
        cleaned = cleaned.replace(/-{2,}/g, "-"); 
        if (cleaned.length > 4 && cleaned[4] !== "-") {
            cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
        }
        if (cleaned.length > 7 && cleaned[7] !== "-") {
            cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7);
        }
        return cleaned;
};

    const guardar = () => {
        if (!cedula || !nombre) return null;
        const nuevoCliente = {
            nuevaCedula: cedula,
            nuevoNombre: nombre,
            nuevosApellidos: apellidos,
            nuevaFecha: fechaNacimiento,
            nuevoSexo: sexo,
        }

        setClientes([nuevoCliente, ...Clientes])
        Alert.alert('Datos almacenados', `  
            Cédula: ${cedula}
            Nombres: ${nombre}
            Apellidos: ${apellidos}
            Fecha Nacimiento: ${fechaNacimiento}
            Sexo: ${sexo}
            `);
        navigation.goBack();
        setCedula('');
        setNombres('');
        setApellidos('');
        setfechaNacimiento('');
        setSexo('');
    };

    const eliminarCliente = (cedula) => {
    const nuevaLista = clientes.filter(cliente => cliente.nuevaCedula !== cedula);
    navigation.setParams({ clientes: JSON.stringify(nuevaLista) });
};


    return (
        <View style={{backgroundColor:'#d6eaf8', flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.textEna}>Registrar datos del cliente</Text>
        
        {/*Input para agregar los datos del cliente*/}
        <View style={styles.cajaTx}>

        <Text style={styles.lebel}>Cédula:</Text>
        <TextInput
            style={styles.input}
            value={cedula}
            onChangeText={(text) => setCedula(formatCedula(text))} 
            placeholder="Ej: 365-130995-0002H"
            maxLength={16}
        />

         <Text style={styles.lebel}>Nombres:</Text>
        <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombres} 
            placeholder="Ej: Juan Carlos"
        />

         <Text style={styles.lebel}>Apellidos:</Text>
        <TextInput
            style={styles.input}
            value={apellidos}
            onChangeText={setApellidos} 
            placeholder="Ej: Pérez López"
        />

         <Text style={styles.lebel}>Fecha de Nacimiento:</Text>
        <TextInput
            style={styles.input}
            value={fechaNacimiento}
            onChangeText={(text) => setfechaNacimiento(formatFecha(text))}
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
            maxLength={10}
        />
        <Text style={styles.lebel}>Sexo:</Text>

        <View style={styles.picker}>
            <Picker 
                selectedValue={sexo}
                onValueChange={(itemValue) => setSexo(itemValue)}
            >
                <Picker.Item label="Seleccione..." value="" style={styles.itemS}/>
                <Picker.Item label="Masculino" value="Masculino" style={styles.itemS}/>
                <Picker.Item label="Femenino" value="Femenino" style={styles.itemS}/>
            </Picker>
         </View>


       
        </View>

        {/*Botones de Registrar y listar*/}
        <View style={styles.contBoton}>
            <TouchableOpacity style={styles.button} onPress={guardar}>
                <FontAwesome6 name="pen-clip" size={25} color="#2980b9"  style={styles.pen}/>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>

           {/*<TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate("ListarProductos", {clientes: JSON.stringify(Clientes) })}>
                <FontAwesome6 name="clipboard-list" size={25} color="#2980b9" style={styles.pen}/>
            <Text style={styles.buttonText}>Listar</Text>
        
             </TouchableOpacity>*/} 
        </View>

        </View>
    
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        alignItems: 'center',
    },
    textEna: {
        fontSize: 30,
        color: "#3498db",
        fontWeight:"bold",
    },
    cajaTx: {
        marginTop: 20,
    },
    contBoton:{
        marginTop: 10,
    },
    button: {
        backgroundColor: '#85c1e9',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        borderColor: '#3498db',
        borderWidth: 3,
        width: 300,
        height: 50,
        marginTop: 5,
        
        justifyContent: 'center',
    },
    buttonText: {
        marginBottom: 5,
        marginTop: 8,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#2980b9',
    },
    pen:{
        marginRight: 5,
    },
    lebel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 2,
        marginTop: 5,
        color: "#3498db",
    },
    input: {
        borderColor: "black",
        borderRadius: 10,
        borderColor: "#3498db",
        borderWidth: 4,
        width: 300,
        height: 50,
    },
    picker:{
        backgroundColor: '#85c1e9',
        width: 300,
        height: 50,
        marginTop: 5,
        borderRadius: 10,
        borderColor: "#3498db",
        borderWidth: 3,
    },
    itemS: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 2,
        marginTop: 1,
        color: "#21618c",
    },


})