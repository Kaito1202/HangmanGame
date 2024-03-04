import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keybord"

//正解の単語を取ってくる
function getWord(){
  return words[Math.floor(Math.random()*words.length)]
}

function App() {
  const [wordToGuess,setWordToGuess]=useState(getWord)
  const[guessedLetters,setGuessedLetters]=useState<string[]>([])

  //guessedLettersが正解の文字と一致しなければ、inCorrectLettersに格納
  const inCorrectLetters=guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )
  //6回以上間違えれば、ゲーム失敗
  const isLoser=inCorrectLetters.length >=6

  //正解の単語を各文字に分解して、それぞれの文字がguessedLettersと一致するかを調べる。すべて一致すればtrueを返す(すなわちゲーム成功）。everyメソッドはコールバック関数が全てtrueを返せば、trueを返す
  const isWinner=wordToGuess.split("").every(letter=>
    guessedLetters.includes(letter)
  )
  
  const addGuessedLetter =useCallback(
    (letter:string)=>{
    //受け取った文字がguessedLettersに含まれていたり（同じ文字を２回入力）、ゲームの勝敗が決まっていれば何もせずに関数を終了
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    //そうでなければ、受け取った文字をguessedLettersに格納
    setGuessedLetters(currentLetters=>[...currentLetters,letter])
    },[guessedLetters,isLoser,isWinner])

  useEffect(()=>{
    const handler=(e:KeyboardEvent)=>{
      const key=e.key
      //キーボードで入力された文字がa~zでなければ何もしない
      if(!key.match(/^[a-z]$/)) return
      //a~zであれば、guessedLettersに追加。ブラウザのデフォルトの動作をキャンセル
      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener("keypress",handler)
    return()=>{
      document.removeEventListener("keypress",handler)
    }
  },[guessedLetters])

  useEffect(()=>{
    const handler=(e:KeyboardEvent)=>{
      const key=e.key
      //Enterキーが押されたら、初期状態に戻す
      if(key!=="Enter") return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress",handler)
    return()=>{
      document.removeEventListener("keypress",handler)
    }
  },[])
  return (
   <div style={{
    maxWidth:"800px",
    display:"flex",
    flexDirection:"column",
    gap:"2rem",
    margin:"0 auto",
    alignItems:"center"
   }}> 
   <div style={{
    fontSize:"2rem",
    textAlign:"center"}}>
    {isWinner &&"Winner! - Refresh to try again"}
    {isLoser && "Nice Try- Refresh to try again "}
   </div>
   <HangmanDrawing numberOfGuessess={inCorrectLetters.length}/>
   <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
    <div style={{alignSelf:"stretch"}}> 
    <Keyboard 
    disabled={isWinner || isLoser}
    activeLetter={guessedLetters.filter(letter=>
     wordToGuess.includes(letter)
    )}
    inactiveLetter={inCorrectLetters}
    addGuessedLetter={addGuessedLetter}
    />
   </div>
   </div>
  )
}

export default App
