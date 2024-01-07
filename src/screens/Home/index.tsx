import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";
import React, { useState } from "react";

export function Home() {

  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  participants.sort()


  function handleParticipantAdd() {
    console.log('funcionando')
    if (participants.includes(participantName)) {
      return Alert.alert('Participante Existe', 'Já existe um participante com esse nome na lista')
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')

  }

  function handleParticipantRemove(name: string) {
    console.log('removendo ' + name)
    let i = participants.indexOf(name)

    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(
            prevState => prevState.filter(participant => participant !== name)
          )
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }


  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Quinta, 4 de janeiro de 2024</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6b6b6b"
          value={participantName}
          onChangeText={setParticipantName}

        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={participants}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou no Evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />


    </View>
  )
}