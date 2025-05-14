import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';


import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

export default function ListarClientes({ route }) {
    const navigation = useNavigation();
    const clientes = route.params?.clientes ? JSON.parse(route.params.clientes) : [];

    const eliminarCliente = (cedula) => {
    const nuevaLista = clientes.filter(cliente => cliente.nuevaCedula !== cedula);
    navigation.setParams({ clientes: JSON.stringify(nuevaLista) });
};


    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate("AgregarProducto")}>
                <View style={styles.icino}>
                    <Entypo name="add-user" size={30} color="#2980b9" />
                </View>
            </TouchableOpacity>

            <View>
                <Text style={styles.titulo}>Lista de Clientes</Text>
            </View>
            <FlatList
                data={clientes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.Datos}>1

                        <TouchableOpacity onPress={() => eliminarCliente(item.nuevaCedula)}>
                            <Ionicons name="trash-bin-sharp" size={30} color="red" style={styles.basura} />
                        </TouchableOpacity>
                        

                         
                        <Text>Cédula: {item.nuevaCedula}</Text>
                        <Text>Nombre: {item.nuevoNombre}</Text>
                        <Text>Apellidos: {item.nuevosApellidos}</Text>
                        <Text>Fecha Nacimiento: {item.nuevaFecha}</Text>
                        <Text>Sexo: {item.nuevoSexo}</Text>
                    </View>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#d6eaf8",
    },
    icino: {
        marginTop: 1,
        marginLeft: 320,
        borderRadius: 10,
        borderWidth: 4,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2980b9",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3498db",
        marginBottom: 10,
        textAlign:"center",
    },
    Datos: {
        backgroundColor: "#85c1e9",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: 5,
        marginTop: 5,
    },
    basura: {
        marginLeft: 300,
    }
});