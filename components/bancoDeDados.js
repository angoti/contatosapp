import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('meu_banco_de_dados.db');

export const criarTabela = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, telefone TEXT, grupo TEXT);'
    );
  });
};

export const salvarContato = (contato) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO contatos (nome, telefone, grupo) VALUES (?, ?, ?);',
      [contato.nome, contato.telefone, contato.grupo],
      (_, result) => {
        console.log('Contato salvo com sucesso!', result);
      },
      (_, error) => {
        console.error('Erro ao salvar o contato:', error);
      }
    );
  });
};

export const carregarContatos = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM contatos;',
      [],
      (_, result) => {
        callback(result.rows._array);
      },
      (_, error) => {
        console.error('Erro ao carregar os contatos:', error);
      }
    );
  });
};

export const atualizarContato = (novoContato) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE contatos SET nome=?, telefone=?, grupo=? WHERE id=?;',
      [novoContato.nome, novoContato.telefone, novoContato.grupo, novoContato.id],
      (_, result) => {
        console.log('Contato atualizado com sucesso!', result);
      },
      (_, error) => {
        console.error('Erro ao atualizar o contato:', error);
      }
    );
  });
};

export const deletarContato = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM contatos WHERE id=?;',
      [id],
      (_, result) => {
        console.log('Contato excluído com sucesso!', result);
      },
      (_, error) => {
        console.error('Erro ao excluir o contato:', error);
      }
    );
  });
};


