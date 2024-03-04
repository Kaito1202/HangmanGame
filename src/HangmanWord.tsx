type HangmanWordProps={
  guessedLetters:string[]
  wordToGuess:string
  reveal?:boolean
}
export function HangmanWord({guessedLetters,wordToGuess,reveal=false}:
  HangmanWordProps){
  return(
    <div style={{
      display:"flex",
      gap:".25rem",
      fontSize:"6rem",
      fontWeight:"bold",
      textTransform:"uppercase",
      fontFamily:"monospace"
    }}>
      {wordToGuess.split("").map((letter,index)=>(
        <span style={{borderBottom:".1em solid black"}}
        key={index}> 
        <span style={{
          //guessedLettersが正解だったり、またはすでにゲームに失敗（終了）していたら単語を表示する
          visibility:guessedLetters.includes(letter) || reveal
          ? "visible"
          :"hidden",
          color:
          //guessedLettersが正解の文字を含んでおらず、かつゲームに失敗（終了）していたら、赤文字で表示する。そうでなければ、黒文字で表示する。
          !guessedLetters.includes(letter)&&reveal? "red":"black",
        }}
        >
        {letter}
        </span>
        </span>
      ))}

    </div>
  )
}