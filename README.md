# M.EIC Final Dissertation

> **2021/2022** - 5th Year, 2nd Semester
> 
> **Course:** Dissertação ([D](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=486322)) | Dissertation

---

## **Parker's Commute**

For more information regarding the organization of this Thesis, you can visit the [Notion workspace](https://www.notion.so/space/e44cf7eb852a46df9d5695fbea5e1d98) used during its development.

---

### :portugal: Jogo Digital para a Promoção da Utilização do Veículo Elétrico :portugal:

> A sustentabilidade do planeta requer uma atuação urgente e a mudança dos hábitos de todas as pessoas. A redução do consumo de combustíveis fósseis é uma das atitudes a tomar e passa, em muitos casos, pela substituição dos veículos a combustão por veículos elétricos.
> 
> No entanto, muitos condutores têm o receio de que a bateria não tenha a carga suficiente para uma utilização cómoda e flexível do veículo, vulgarmente designado por "low-battery anxiety". Isso faz com que acabem por adquirir veículos com uma capacidade de bateria excessiva para a maior parte da utilização, ou optar por não adquirir o veículo elétrico.
> 
> Os jogos têm a capacidade de promover uma experiência (gameplay) que permite uma maior consciencialização dos diversos desafios, e promovem também a aprendizagem e a aquisição de competências em diversas áreas.
> 
> Pretende-se criar um jogo de simulação onde o jogador será desafiado a resolver desafios de mobilidade, utilizando diversos veículos elétricos, de forma a adquirir uma maior consciencialização sobre a verdadeira capacidade destes veículos, e a melhor forma de os utilizar.

---

### :uk: Digital Game for the Promotion of the Usage of the Electric Vehicle :uk:

> The planet's sustainability requires urgent action and a change in the habits of every person. The reduction of the consumption of fossil fuels is one of the attitudes to take, and it involves, in many cases, the substitution of combustion vehicles for electric vehicles.
> 
> However, many drivers are afraid that the battery does not have enough capacity to allow for a comfortable and flexible use of the vehicle, a phenomenon commonly know as "low-battery anxiety". This makes it so that they end up acquiring vehicles with an excessive battery capacity for the use that it will be given, or choose not to get an electric vehicle altogether.
> 
> Games have the ability to promote an experience (gameplay) that allows to raise awareness of different challenges, and also promote the learning and acquisition of skills in diverse areas.
> 
> The intent is to create a simulation game where the player will be challenged to solve mobility challenges, using various electric vehicles, in order to achieve greater awareness regarding the true potential of these vehicles, and the best way to utilize them.

---

## How to Run Locally

To run, you need an application bundler to wrap everything together. In my case, I used **Parcel**, which is available on **Node.js**.
1. You need to have `node.js` installed on your computer.
2. Open your terminal, and run `npm ci` in the `game` and `server` directories, in order to install the project dependencies.
3. On the `game` and `server` directories, you will need to create `.env` files to make the game work.
   1. On the `server` directory, we use the variables:
      - `API_KEY`: a valid key to the Google Maps API (you can generate one for free)
      - `PORT`: the port where you want the server to run (default will be `3000`)
   2. On the `game` directory, we use the variables:
      - `API_KEY`: same API key that is needed in the `server` directory
      - `API_URL`: the URL to which the API calls must be sent. This will usually be `http://localhost:<PORT>`, using the `PORT` value from the `server` configuration, but you can also host the API in a free online service, such as [Koyeb](https://app.koyeb.com/)!
4. In case you want to run the API locally, you need to run the script at `server/index.js`, in order to have access to the proxy server that allows making calls to APIs with stricter CORS policies. This script is run by running `npm start` on the terminal, from the `server` directory.
5. Finally, run the program by running `npm start` on the terminal, from the `game` directory. Alternatively, you can run `npx parcel *.html`, to run manually. If you do this, you can specify the port by adding `-p <port-number>` to the command. The default port is `1234`.

The game will then be available at `localhost:<port-number>` (this link is shown in the prompt on the terminal)!