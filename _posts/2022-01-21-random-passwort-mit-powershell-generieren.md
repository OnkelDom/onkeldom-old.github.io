---
title: Random Passwort mit Powershell generieren
permalink: /blog/random-Passwort-mit-powershell-generieren
date: '2022-01-21 22:19:01 +0100'
categories:
  - powershell
  - sicherheit
---
Ich bin die tage mit der Aufgabe konfrontiert worden, während der Ausführung eines Skriptes ein Passwort zu generieren und dieses dann weiter zu verarbeiten. Ziel war es, dass nicht mal der Skript ausführende das Passwort sehen kann. 

Das ganze habe ich nicht selbst geschrieben, sondern von einem anderen Blog genutzt. Ich veröffentliche das nur hier nochmal selbst, da ich die Umsetzung davon wirklich genial finde. 

```powershell
# Function to select random chars
function Get-RandomCharacters($length, $characters) {
    $random = 1..$length | ForEach-Object { Get-Random -Maximum $characters.length }
    $private:ofs = ""
    return [String]$characters[$random]
}

# Function to scramble the defined string
function Scramble-String([string]$inputString) {     
    $characterArray = $inputString.ToCharArray()   
    $scrambledStringArray = $characterArray | Get-Random -Count $characterArray.Length     
    $outputString = -join $scrambledStringArray
    return $outputString 
}

# Select random chars from strings
# The sum of length are the password length
$password = Get-RandomCharacters -length 10 -characters 'abcdefghiklmnoprstuvwxyz'
$password += Get-RandomCharacters -length 5 -characters 'ABCDEFGHKLMNOPRSTUVWXYZ'
$password += Get-RandomCharacters -length 4 -characters '1234567890'
$password += Get-RandomCharacters -length 5 -characters '!"§$%&/()=?}][{@#*+'

# Scramble password string
# WARNING: In the above variable ist the password stored in plaintext
$password = Scramble-String $password

# Generate password
$EncryptedPassword = ConvertTo-SecureString -String $password -AsPlainText -Force

# Cleanup variable
Clear-Variable -Name "password"
```

Im Script gibt es leider genau eine stelle, in der das Passwort kurzfristig zur weiterverarbeitung gespeichert wird. Sobald der verschlüsselte String generiert wurde, wird die variable geleert. 