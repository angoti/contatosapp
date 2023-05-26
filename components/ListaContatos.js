import { StyleSheet, Pressable, Text, View, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ListaContatos({ contatos, editar, editando }) {
  function renderizarTarefa({ item, index }) {
    return (
      <Pressable style={styles.container} onPress={() => editar(index)}>
        <View style={{ flex: 1 }}>
          {item.grupo === 'familia' ? (
            <MaterialIcons name="family-restroom" size={24} color="blue" />
          ) : item.grupo === 'amigos' ? (
            <FontAwesome5 name="user-friends" size={24} color="green" />
          ) : (
            <MaterialIcons name="desktop-mac" size={24} color="orange" />
          )}
        </View>
        <View style={{ flex: 7, flexDirection: 'column' }}>
          <Text style={styles.contato}>{item.nome}</Text>
          <Text style={styles.contato}>{item.telefone}</Text>
        </View>
        <View style={{ flex: 1 }}>
          {/* Renderizar ícone de edição */}
          {editando === index && (
            <MaterialIcons name="edit" size={16} color="red" />
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <FlatList
      style={styles.lista}
      data={contatos}
      renderItem={(item, index) => renderizarTarefa(item, index)}
      ListHeaderComponent={
        <Text style={styles.tituloLista}>Lista de contatos</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginHorizontal: 10,
  },
  lista: {
    width: '100%',
  },
  contato: {
    paddingVertical: 1,
    flex: 1,
    marginLeft: 6,
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
});
