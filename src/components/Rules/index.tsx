import React, { FC, memo } from 'react'
import styled from 'styled-components'

export const Rules: FC<{ closeRules: () => void }> = memo(({ closeRules }) => {
  return (
    <Container>
      <CloseButton onClick={closeRules}>✗</CloseButton>
      <Title>Правила</Title>
      <p>
        <ul>
          <li>Количество колод: 1</li>
          <li>Количество карт в колоде: 36</li>
          <li>Количество игроков: 2 - 4</li>
          <li>Старшинство карт: 6, 7, 8, 9, 10, В, Д, К, Т.</li>
        </ul>
      </p>
      <SubTitle>Раздача</SubTitle>
      <p>
        Сдаются карты по одной, 4 карты каждому игроку. Колода кладётся на
        середину стола. В первой игре первый ход достаётся случайно выбранному
        игроку, а далее игроку, победившему в прошлой игре.{' '}
      </p>
      <SubTitle>Игра</SubTitle>
      <p>
        Ходят в данной игре по очереди, по часовой стрелке — ходить следующим
        будет игрок, сидящий слева от того, кто начал игру. На открытую карту
        игрок может положить свою той же масти или того же достоинства. Если у
        него нет требуемой карты, он берет одну карту из колоды — если же она не
        подошла, ход переходит к следующему игроку. Если карты в колоде
        кончаются, то со стопки открытых карт снимается верхняя и оставляется
        открытой на столе, остальные же переворачиваются и снова служат колодой
        (в некоторых вариантах игры — перетасовываются).{' '}
      </p>
      <SubTitle>Особенности карт</SubTitle>

      <p>
        <strong>6</strong> — игрок, который сходил, должен «покрыть» её —
        положить другую карту, соответствующую правилам (если нет подходящих —
        брать из колоды, пока не найдёт нужную).
        <br />
        <strong>7</strong> — следующий игрок должен взять 2 карты и пропустить
        ход (если в игре всего 2 игрока, то ход остаётся у того, кто положил
        карту); eсли 7 пиковая, то нужно взять 4 карты; Игрок может не ходить
        этой картой, если данная имеется.
        <br />
        <strong>Т</strong> — следующий игрок пропускает ход;
        <br />
        <strong>Д</strong> - игрок, выложивший даму, должен заказать любую
        масть. Следующий игрок, в этом случае, может положить карту только
        заказанной масти или даму (и перезаказать любую масть). Дама может быть
        положена на любую карту. <br />
        <strong>К ♠</strong> - следующий игрок должен взять 5 карты и пропустить
        ход.
      </p>
      <SubTitle>Подсчёт очков</SubTitle>

      <p>
        Валет — 2 очка. <br />
        Дама — 3 очка. <br />
        Король — 4 очка. <br />
        Туз — 11 очков. <br />
        Девятка — 0 очков.
        <br />
        Остальные карты — по достоинству.
        <br />
        Победивший игрок, если последней его картой была дама, списывает со
        своего счёта 20 очков (если пиковая — 40). Игрок, оставшийся только с
        дамами на руках, добавляет к своему счёту 20 очков с каждой дамы, а если
        дама пиковая, то 40.
      </p>
      <SubTitle>Цель игры</SubTitle>
      <p>
        Цель одного кона игры заключается в том, чтобы избавиться от всех карт
        на руках. Выигрывает первый избавившийся от своих карт. Остальные
        считают очки на картах, оставшиеся у них на руках. Штрафные очки,
        заработанные в каждом раунде, суммируются. Первый, кто набирает более
        101 очка, проигрывает и выходит из игры. Игра продолжается между
        оставшимися игроками далее. Выигравшим считается последний игрок, так и
        не набравший 101 штрафное очко. Если игрок набирает 100 очков, то сумма
        его очков снижается до 50. Если игрок набирает 101 очко, то сумма его
        очков снижается до 0.
      </p>
    </Container>
  )
})

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  padding: 24px;
  background: white;
  overflow: scroll;
`

const Title = styled.h3``

const SubTitle = styled.h4``

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  color: #276180;
  background: transparent;
  border: 0;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #00c1ff;
  }
`
