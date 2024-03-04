import styles from "./Keyboard.module.css"

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]
type KeyboardProps={
  activeLetter:string[]
  inactiveLetter:string[]
  addGuessedLetter:(letter:string)=>void
  disabled:boolean
}
export function Keyboard({activeLetter,inactiveLetter,addGuessedLetter,disabled=false}:KeyboardProps){
  return<div style={{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(75px,1fr))",
    gap:".5rem"
  }}>
    {KEYS.map(key=>{
      const isActive=activeLetter.includes(key)
      const isInActive=inactiveLetter.includes(key)
      return<button 
      onClick={()=>addGuessedLetter(key)}
      //単語がactive(guessedLettersのうち、正解の文字と一致している単語)の場合、activeのCSSを適用。inactive(間違えている文字)はinactiveのCSSを適用
      className={`${styles.btn} ${isActive ? styles.active:""}
      ${isInActive ? styles.inactive:""}`}
      //disabledとは、activeかinactiveになっている文字、すなわち既に押されている文字のこと
      disabled={isInActive || isActive || disabled}
      key={key}>
        {key}
      </button>
    })}
  </div>
}