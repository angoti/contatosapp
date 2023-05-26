import EntradaDados from './components/EntradaDados';
import ListaContatos from './components/ListaContatos';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  criarTabela,
  salvarContato,
  carregarContatos,
  atualizarContato,
  deletarContato,
} from './components/bancoDeDados';

export default function App() {
  const contatoVazio = { nome: '', telefone: '', grupo: 'amigos', id: '' };
  const [contatos, setContatos] = useState([
    { nome: '', telefone: '', grupo: '', id: '' },
  ]);
  const [idContatoEditando, setIdContatoEditando] = useState(-1);
  const [contatoEditando, setContatoEditando] = useState(contatoVazio);

  useEffect(() => {
    criarTabela();
    carregarContatos((contatos) => {
      console.log('Contatos carregados:', contatos);
      setContatos(contatos);
    });
  }, []);

  function editarContato(index) {
    console.log('editando ' + index);
    setIdContatoEditando(index);
    setContatoEditando(contatos[index]);
  }

  function excluirContato() {
    console.log(' excluindo ', contatoEditando);
    setContatos(contatos.filter(contato=>contato!==contatoEditando));
    deletarContato(contatoEditando.id);
  }

  function adicionarContato(novoContato) {
    console.log('adicionando/atualizando ', novoContato);
    console.log('idContatoEditando ', idContatoEditando);

    // cria novo contato
    if (idContatoEditando === -1) {
      setContatos([...contatos, novoContato]);
      salvarContato(novoContato);
    }
    // atualiza um contato existente
    else {
      let contatosAtualizados = [...contatos];
      contatosAtualizados[idContatoEditando] = novoContato;
      setContatos(contatosAtualizados);
      atualizarContato(novoContato);
    }
    setIdContatoEditando(-1);
    setContatoEditando(contatoVazio);
  }

  return (
    <View style={{ marginTop: 40 }}>
      <EntradaDados
        adicionar={adicionarContato}
        excluir={excluirContato}
        contatoEditando={contatoEditando}
        editando={idContatoEditando}
      />
      <ListaContatos
        contatos={contatos}
        editar={editarContato}
        editando={idContatoEditando}
      />
    </View>
  );
}
