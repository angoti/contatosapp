import { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Pressable,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EntradaDados({
  adicionar,
  excluir,
  contatoEditando,
  editando,
}) {
  console.log('entrada de dados ');
  console.log('     registro sendo editado: ', contatoEditando);
  console.log('     id sendo editado: ', editando);
  const [grupo, setGrupo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nome, setNome] = useState('');

  useEffect(() => {
    console.log('useEffect entrada de dados');
    setTelefone(contatoEditando.telefone);
    setGrupo(contatoEditando.grupo);
    setNome(contatoEditando.nome);
  }, [contatoEditando]);

  function atualizarContato() {
    if (nome !== '' && telefone !== '' && grupo !== '') {
      adicionar({ ...contatoEditando, nome, telefone, grupo });
    }
  }

  function excluirContato() {
    excluir();
  }
  function adicionarContato() {
    if (nome !== '' && telefone !== '' && grupo !== '') {
      adicionar({ nome, telefone, grupo });
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome..."
        onChangeText={(texto) => setNome(texto)}
        value={nome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone..."
        onChangeText={(texto) => setTelefone(texto)}
        value={telefone}
      />
      <View style={styles.radioGrupo}>
        <Pressable style={styles.radio} onPress={() => setGrupo('familia')}>
          <Text>Familia</Text>
          {grupo === 'familia' ? (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-on"
              size={24}
              color="black"
            />
          ) : (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-off"
              size={24}
              color="black"
            />
          )}
        </Pressable>
        <Pressable style={styles.radio} onPress={() => setGrupo('amigos')}>
          <Text>Amigos</Text>
          {grupo === 'amigos' ? (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-on"
              size={24}
              color="black"
            />
          ) : (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-off"
              size={24}
              color="black"
            />
          )}
        </Pressable>
        <Pressable style={styles.radio} onPress={() => setGrupo('trabalho')}>
          <Text>Trabalho</Text>
          {grupo === 'trabalho' ? (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-on"
              size={24}
              color="black"
            />
          ) : (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-off"
              size={24}
              color="black"
            />
          )}
        </Pressable>
      </View>
      {editando >= 0 ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <Button title="Atualizar" onPress={() => atualizarContato()} />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 3 }}>
            <Button title="Excluir" onPress={() => excluirContato()} />
          </View>
        </View>
      ) : (
        <Button title="Adicionar" onPress={() => adicionarContato()} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 4,
    marginBottom: 10,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioIcon: {
    marginLeft: 4,
  },
  radioGrupo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
});
