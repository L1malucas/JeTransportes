# Documentação do Projeto - **Bodes De Sorte**

## Sumário
- [Stack Version](#stack-version)
- [Executar Projeto](#executar-projeto)
- [Alertas](#alertas-importantes-pra-não-quebrar-tudo)
    - [1. Nunca altere a pasta android/ ou ios/](#1-nunca-altere-a-pasta-android-ou-ios-diretamente)
    - [2. Arquivos de configuração](#2-arquivos-de-configuração-e-para-que-servem)
    - [3. Alterar nome do app](#3-alterar-nome-do-app-é-no-appjson-não-no-androidmanifest-ou-infoplist)
    - [4. Instalação de pacotes](#4-não-instale-pacotes-sem-checar-compatibilidade)
    - [5. Node modules](#5-nunca-edite-node_modules-diretamente)
    - [6. Lockfiles](#6-commitar-lockfiles-yarnlock-ou-package-lockjson-é-obrigatório)
    - [7. Audit fix](#7-evite-npm-audit-fix--yarn-audit-fix-sem-checar-o-impacto)
- [Gerar Build](#gerar-build)
  - [Autenticação Expo](#autentique-se-no-expo)
  - [Execução EAS](#execute-o-eas-diretamente)
  - [EAS para testes](#execute-o-eas-para-testes)
- [Limpeza e Tratamento de Erros NPM](#limpeza-e-tratamento-de-erros-npm)
- [Atualização OTA](#atualização-ota-over-the-air)

## Stack Version

* **Node:** 18.18.0
* **Typescript:** 5.3.3
* **React Native:** 0.76.9
* **Expo:** 52.0.44
* **Redux:** 9.2.0
* **Java:** 17
* **Android SDK:** 34

---

## Executar Projeto

```bash
# Instale as dependências do projeto
npm install

# Inicie build local Android
npm run android

# Inicie build local ios
npm run ios
```

---

## Alertas Importantes (Pra não quebrar tudo)

### 1. Nunca altere a pasta `android/` (ou `ios/`) diretamente

Modificações manuais em arquivos nativos devem ser feitas **com conhecimento específico**. A maioria das configurações pode (e deve) ser feita via arquivos de configuração no root do projeto.

### 2. Arquivos de configuração e para que servem

- **`app.json`**  
  Configurações do projeto, como nome do app, slug, versão, ícones, splash, etc.  
  Exemplo:  
  ```json
  {
    "expo": {
      "name": "NomeDoApp",
      "slug": "nome-do-app",
      "version": "1.0.0",
      ...
    }
  }
  ```

* **`eas.json`**
  Usado para configurar builds e submits com o EAS (Expo Application Services). Define perfis como `production`, `preview`, `development`.
  Exemplo:

  ```json
  {
    "build": {
      "production": {
        "android": {
          "buildType": "apk"
        }
      }
    }
  }
  ```

* **`babel.config.js`**
  Configura o Babel, que transpila o código JS. Altere só se for necessário (ex: adicionar plugins).

* **`tsconfig.json`**
  Configuração do TypeScript. Útil para ajustar paths, regras de compilação e tipo de projeto.

* **`metro.config.js`**
  Configura o bundler Metro. Alterações aqui impactam resolução de módulos e ativos. Faça com cuidado.

* **`package.json`**
  Scripts, dependências e metadados do projeto. Qualquer mudança aqui impacta diretamente a build e o comportamento do app.


### 3. Alterar nome do app? **É no `app.json`**, não no AndroidManifest ou Info.plist

Modificar o nome diretamente nos arquivos nativos pode quebrar o build. Use:

```json
{
  "expo": {
    "name": "MeuApp"
  }
}
```

### 4. Não instale pacotes sem checar compatibilidade

Antes de rodar `npm install` ou `yarn add`, verifique:

* Compatibilidade com sua versão do React Native / Expo
* Se precisa de `react-native link`, `expo install`, ou configurações nativas
* Issues abertas no repositório da lib


### 5. Nunca edite `node_modules/` diretamente

Qualquer alteração em libs de terceiros deve ser feita com `patch-package`. Edits diretos serão perdidos após reinstalar dependências.


### 6. Commitar lockfiles (`yarn.lock` ou `package-lock.json`) é obrigatório

Garante consistência de dependências entre máquinas e ambientes. Você só deve ter um dos dois, nunca ambos!


### 7. Evite `npm audit fix` / `yarn audit fix` sem checar o impacto

Esses comandos podem instalar versões incompatíveis com seu projeto. Use com cautela e verifique as mudanças propostas.

---

## Gerar Build

### Autentique-se no Expo

```bash
npx expo login
# Email: cisuno7@hotmail.com
# Senha: G77142153
```
### Execute o EAS diretamente 
```bash
# Build para desenvolvimento
eas build -p android --profile development

# Build para homologação
eas build -p android --profile hmg

# Build para produção
eas build -p android --profile main
```
### Execute o EAS para testes 

```bash
# Gera rapidamente build para uma plataforma especifica
npm run android-dev

npm run ios-dev
```
---

## Limpeza e Tratamento de Erros NPM

### 1. Apagar `node_modules` e `package-lock.json` / `yarn.lock`

```bash
rm -rf node_modules package-lock.json yarn.lock
```
### 2. Limpar Cache

```bash
npm cache clean --force
OU
yarn cache clean
```
### 3. Reinstalar dependências

```bash
npm install
OU
yarn
```
---

## Atualização OTA (Over The Air)

**ATENÇÃO: USE COM EXTREMA CAUTELA**

As atualizações OTA são destinadas apenas para **correções menores**.

```bash
# Build da aplicação na main
eas build -p android --profile main

# Realizar update OTA com mensagem
eas update --branch main --message "Mensagem descritiva"
```

> Após update, reinicie a aplicação até duas vezes.

