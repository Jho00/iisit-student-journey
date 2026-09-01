'use client';

import { useEffect, useMemo, useState } from 'react';

type Lab = {
  id: string;
  number: string;
  timing: string;
  lecture: string;
  title: string;
  description: string;
};

type CourseworkStep = {
  id: string;
  timing: string;
  title: string;
  description: string;
  critical?: boolean;
};

const labs: Lab[] = [
  {
    id: 'lab-1',
    number: '01',
    timing: 'после лекции 02',
    lecture: 'Приобретение и стимуляция знаний',
    title: 'База знаний',
    description: 'Оформить знания экспертной системы в виде правил.',
  },
  {
    id: 'lab-2',
    number: '02',
    timing: 'после лекции 04',
    lecture: 'Семантические сети',
    title: 'Семантическая сеть',
    description: 'Описать выбранный фрагмент знаний в форме сети.',
  },
  {
    id: 'lab-3',
    number: '03',
    timing: 'после лекции 05',
    lecture: 'Экспертные системы',
    title: 'Экспертная система',
    description: 'Собрать систему поддержки принятия решений.',
  },
  {
    id: 'lab-4',
    number: '04',
    timing: 'после лекции 06',
    lecture: 'Продукционные модели',
    title: 'И/ИЛИ-граф',
    description: 'Построить граф и проверить адекватность решений.',
  },
  {
    id: 'lab-5',
    number: '05',
    timing: 'после лекции 08',
    lecture: 'Модели нечёткой логики',
    title: 'Система нечёткого вывода',
    description: 'Разработать вывод по теме своей курсовой работы.',
  },
  {
    id: 'lab-6',
    number: '06',
    timing: 'после лекции 12',
    lecture: 'Гибридные AI и LLM',
    title: 'Диалоговая система',
    description: 'Построить диалоговый интерфейс к модели знаний.',
  },
];

const courseworkSteps: CourseworkStep[] = [
  {
    id: 'cw-topic',
    timing: 'до 30 сентября',
    title: 'Выбрать тему',
    description: 'Определить предметную область и задачу принятия решения.',
    critical: true,
  },
  {
    id: 'cw-research',
    timing: 'октябрь',
    title: 'Собрать знания',
    description: 'Найти авторитетные источники, описать пользователей, входы и результаты системы.',
  },
  {
    id: 'cw-models',
    timing: 'октябрь — ноябрь',
    title: 'Спроектировать модели',
    description: 'Подготовить дерево решений, фреймовую и продукционную модели.',
  },
  {
    id: 'cw-build',
    timing: 'ноябрь — декабрь',
    title: 'Реализовать систему',
    description: 'Написать программу, протестировать сценарии и оформить текст работы.',
  },
  {
    id: 'cw-submit',
    timing: 'середина — конец декабря',
    title: 'Сдать и защитить',
    description: 'Показать работающий прототип и объяснить принятые решения.',
    critical: true,
  },
];

const lectures = [
  ['01', 'Введение'],
  ['02', 'Приобретение знаний', 'ЛР 01'],
  ['03', 'Логический вывод'],
  ['04', 'Семантические сети', 'ЛР 02'],
  ['05', 'Экспертные системы', 'ЛР 03'],
  ['06', 'Продукционные модели', 'ЛР 04'],
  ['07', 'Фреймы и сценарии'],
  ['08', 'Нечёткая логика', 'ЛР 05'],
  ['09', 'Диалоговые системы'],
  ['10', 'Марковские сети'],
  ['11', 'Байесовские сети'],
  ['12', 'Гибридные AI и LLM', 'ЛР 06'],
  ['13', 'Продвинутый LLM'],
  ['14', 'Приём курсовых', 'Защита'],
  ['15', 'Приём курсовых', 'Защита'],
  ['16', 'Приём курсовых', 'Защита'],
];

const courseworkRequirements = [
  {
    number: '01',
    title: 'Основа системы',
    text: 'Целевая аудитория, назначение, входные и выходные данные, проверяемые источники знаний.',
  },
  {
    number: '02',
    title: 'Дерево решений',
    text: 'Логичное покрытие предметной области: 15–20 конечных рекомендаций и 4–5 уровней.',
  },
  {
    number: '03',
    title: 'Две модели знаний',
    text: 'Фреймы для объектов и свойств; непротиворечивые продукционные правила «если — то».',
  },
  {
    number: '04',
    title: 'Рабочий прототип',
    text: 'Читаемый код, корректные ответы, устойчивость к пользовательскому вводу и пример сеанса.',
  },
  {
    number: '05',
    title: 'Академический текст',
    text: 'Введение, шесть глав, заключение и не менее 20 источников со ссылками в тексте.',
  },
];

const progressIds = [...labs.map((lab) => lab.id), ...courseworkSteps.map((step) => step.id)];

export default function Home() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('iisit-journey-progress');
      const savedTheme = localStorage.getItem('iisit-journey-theme');
      if (saved) setCompleted(JSON.parse(saved));
      if (savedTheme === 'dark') setDark(true);
    } catch {
      localStorage.removeItem('iisit-journey-progress');
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    if (hydrated) localStorage.setItem('iisit-journey-theme', dark ? 'dark' : 'light');
  }, [dark, hydrated]);

  const completedCount = progressIds.filter((id) => completed.includes(id)).length;
  const progress = Math.round((completedCount / progressIds.length) * 100);
  const topicChosen = completed.includes('cw-topic');
  const firstThreeLabsDone = labs.slice(0, 3).every((lab) => completed.includes(lab.id));
  const allLabsDone = labs.every((lab) => completed.includes(lab.id));
  const courseworkDone = completed.includes('cw-submit');
  const attestationReady = topicChosen && firstThreeLabsDone;
  const examReady = allLabsDone && courseworkDone;

  const nextStepId = useMemo(
    () => progressIds.find((id) => !completed.includes(id)),
    [completed],
  );

  function persist(next: string[]) {
    setCompleted(next);
    localStorage.setItem('iisit-journey-progress', JSON.stringify(next));
  }

  function toggleCoursework(id: string) {
    persist(completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id]);
  }

  function toggleLab(id: string, index: number) {
    if (completed.includes(id)) {
      const labsToClear = new Set(labs.slice(index).map((lab) => lab.id));
      persist(completed.filter((item) => !labsToClear.has(item)));
      return;
    }
    const previousLab = labs[index - 1];
    if (!previousLab || completed.includes(previousLab.id)) persist([...completed, id]);
  }

  function resetProgress() {
    persist([]);
  }

  function goToNextStep() {
    if (!nextStepId) return;
    document.getElementById(nextStepId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="В начало страницы">
          <span className="brand-mark">ИИ</span>
          <span>ИТиС · СГТУ</span>
        </a>
        <nav className="desktop-nav" aria-label="Разделы страницы">
          <a href="#journey">Маршрут</a>
          <a href="#lectures">16 недель</a>
          <a href="#coursework">Курсовая</a>
          <a href="#exam">Допуск</a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setDark((value) => !value)}
          aria-label={dark ? 'Включить светлую тему' : 'Включить тёмную тему'}
        >
          <span aria-hidden="true">{dark ? '☀' : '◐'}</span>
          <span className="theme-label">{dark ? 'Светлая' : 'Тёмная'}</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">Student journey · 1 сентября → январь</p>
          <h1>
            Интеллектуальные
            <br />
            <span>технологии и системы</span>
          </h1>
          <p className="hero-intro">
            Маршрут по дисциплине — от первой лекции до допуска к экзамену.
          </p>
          <div className="teaching-team" aria-label="Преподаватели дисциплины">
            <article className="teacher-card">
              <span>Лекции</span>
              <div>
                <h3>Акутин Артем Сергеевич</h3>
                <p>Старший преподаватель кафедры ПИТ</p>
              </div>
            </article>
            <article className="teacher-card">
              <span>Практики</span>
              <div>
                <h3>Володина Елена Васильевна</h3>
                <p>Старший преподаватель кафедры ПИТ</p>
              </div>
            </article>
          </div>
          <div className="semester-strip" aria-label="Сроки семестра">
            <span><b>01.09</b> старт</span>
            <i aria-hidden="true" />
            <span><b>середина семестра</b> аттестация</span>
            <i aria-hidden="true" />
            <span><b>31.12</b> финиш</span>
            <i aria-hidden="true" />
            <span className="january"><b>начало января</b> экзамен</span>
          </div>
        </div>

        <aside className="progress-card" aria-label="Прогресс по курсу">
          <div className="progress-head">
            <span>Мой прогресс</span>
            <strong>{hydrated ? progress : 0}%</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${hydrated ? progress : 0}%` }} />
          </div>
          <p>{completedCount} из {progressIds.length} ключевых шагов отмечено</p>
          <div className={`mini-status ${attestationReady ? 'is-ready' : ''}`}>
            <span className="status-dot" aria-hidden="true" />
            <div>
              <b>Межсессионная аттестация</b>
              <small>{attestationReady ? 'Условия выполнены' : 'Нужны ЛР 01–03 и тема курсовой'}</small>
            </div>
          </div>
          <div className={`mini-status ${examReady ? 'is-ready' : ''}`}>
            <span className="status-dot" aria-hidden="true" />
            <div>
              <b>Допуск к экзамену</b>
              <small>{examReady ? 'Маршрут завершён' : 'Нужны все ЛР и курсовая'}</small>
            </div>
          </div>
          <button className="next-button" type="button" onClick={goToNextStep} disabled={!nextStepId}>
            {nextStepId ? 'Перейти к следующему шагу' : 'Всё готово'} <span aria-hidden="true">↓</span>
          </button>
        </aside>
      </section>

      <section className="rules-band" aria-label="Главные правила">
        <div><span>01</span><p><b>Лабораторные — строго по порядку.</b> Следующая открывается после предыдущей.</p></div>
        <div><span>02</span><p><b>Курсовая идёт параллельно.</b> Не оставляйте проект на декабрь.</p></div>
        <div><span>03</span><p><b>Нет сданной курсовой — нет допуска.</b> Защита проходит в конце декабря.</p></div>
      </section>

      <section className="journey-section" id="journey" aria-labelledby="journey-title">
        <div className="section-heading">
          <div>
            <p className="kicker">Два параллельных трека</p>
            <h2 id="journey-title">Ваш маршрут</h2>
          </div>
          <p>Отмечайте выполненное. Прогресс сохраняется на этом устройстве автоматически.</p>
        </div>

        <div className="parallel-map">
          <div className="lane lab-lane">
            <div className="lane-head">
              <span className="lane-symbol">ЛР</span>
              <div><p>Основной трек</p><h3>Лабораторные</h3></div>
              <b>6 шагов</b>
            </div>
            <div className="lane-list">
              {labs.map((lab, index) => {
                const checked = completed.includes(lab.id);
                const previousLab = labs[index - 1];
                const locked = Boolean(previousLab && !completed.includes(previousLab.id) && !checked);
                return (
                  <article className={`journey-card ${checked ? 'is-complete' : ''} ${locked ? 'is-locked' : ''}`} id={lab.id} key={lab.id}>
                    <div className="card-number">{lab.number}</div>
                    <div className="card-content">
                      <p className="card-meta">{lab.timing} · {lab.lecture}</p>
                      <h4>{lab.title}</h4>
                      <p>{lab.description}</p>
                    </div>
                    <label className="check-control">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={locked}
                        onChange={() => toggleLab(lab.id, index)}
                      />
                      <span className="custom-check" aria-hidden="true">✓</span>
                      <span>{locked ? 'Сначала предыдущая' : checked ? 'Сдано' : 'Отметить сдачу'}</span>
                    </label>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="lane coursework-lane">
            <div className="lane-head">
              <span className="lane-symbol">КР</span>
              <div><p>Параллельный трек</p><h3>Курсовая</h3></div>
              <b>5 шагов</b>
            </div>
            <div className="lane-list">
              {courseworkSteps.map((step, index) => {
                const checked = completed.includes(step.id);
                return (
                  <article className={`journey-card ${checked ? 'is-complete' : ''} ${step.critical ? 'is-critical' : ''}`} id={step.id} key={step.id}>
                    <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                    <div className="card-content">
                      <p className="card-meta">{step.timing}</p>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                    <label className="check-control">
                      <input type="checkbox" checked={checked} onChange={() => toggleCoursework(step.id)} />
                      <span className="custom-check" aria-hidden="true">✓</span>
                      <span>{checked ? 'Готово' : 'Отметить шаг'}</span>
                    </label>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`attestation-gate ${attestationReady ? 'is-ready' : ''}`} aria-live="polite">
          <div className="gate-tag">Середина семестра</div>
          <div>
            <p className="kicker">Межсессионная аттестация</p>
            <h3>{attestationReady ? 'Условия выполнены' : 'Контрольная точка'}</h3>
          </div>
          <div className="gate-checks">
            <span className={firstThreeLabsDone ? 'done' : ''}>ЛР 01–03</span>
            <i>+</i>
            <span className={topicChosen ? 'done' : ''}>тема курсовой</span>
            <i>=</i>
            <strong>{attestationReady ? 'готово' : 'аттестация'}</strong>
          </div>
        </div>
      </section>

      <section className="lecture-section" id="lectures" aria-labelledby="lectures-title">
        <div className="section-heading light-heading">
          <div>
            <p className="kicker">Учебный пульс</p>
            <h2 id="lectures-title">16 недель</h2>
          </div>
          <p>Лабораторные появляются рядом с лекциями, на которых вы получаете нужную основу.</p>
        </div>
        <div className="lecture-rail">
          {lectures.map(([week, title, checkpoint], index) => (
            <article className={`lecture-stop ${index >= 13 ? 'is-defense' : ''}`} key={week}>
              <div className="rail-node"><span>{week}</span></div>
              <p>{index < 4 ? 'Сентябрь' : index < 8 ? 'Октябрь' : index < 13 ? 'Ноябрь / декабрь' : 'Декабрь'}</p>
              <h3>{title}</h3>
              {checkpoint && <b>{checkpoint}</b>}
            </article>
          ))}
        </div>
      </section>

      <section className="coursework-section" id="coursework" aria-labelledby="coursework-title">
        <div className="section-heading">
          <div>
            <p className="kicker">Требования к курсовой</p>
            <h2 id="coursework-title">Что должно быть внутри</h2>
          </div>
          <p>Цель — разработать экспертную систему принятия решения в конкретной предметной области.</p>
        </div>

        <div className="requirements-grid">
          {courseworkRequirements.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="rubric-panel">
          <div className="rubric-score">
            <p className="kicker">Критерии оценки</p>
            <strong>5.0</strong>
            <span>максимальный балл</span>
          </div>
          <div className="rubric-bars">
            <div><span>Глубина базы знаний</span><i><b style={{ width: '50%' }} /></i><strong>2.5</strong></div>
            <div><span>Техническая реализация</span><i><b style={{ width: '30%' }} /></i><strong>1.5</strong></div>
            <div><span>Качество оформления</span><i><b style={{ width: '10%' }} /></i><strong>0.5</strong></div>
            <div><span>Структура и нормы</span><i><b style={{ width: '10%' }} /></i><strong>0.5</strong></div>
          </div>
          <div className="rubric-note">
            <span>+</span>
            <p><b>До 0.5 балла внутри технической части</b> — за продуманный графический или веб-интерфейс.</p>
          </div>
        </div>

        <details className="structure-details">
          <summary><span>Рекомендуемая структура работы</span><b>Открыть план</b></summary>
          <div className="details-content">
            <ol>
              <li><b>Введение</b><span>1.5–2 страницы: актуальность, цель, подробные задачи.</span></li>
              <li><b>Материалы и методы</b><span>Источники знаний и характеристика пользователей.</span></li>
              <li><b>Графовая модель</b><span>Дерево решений и объяснение логики опроса.</span></li>
              <li><b>Фреймовая модель</b><span>Объекты, их свойства и значения.</span></li>
              <li><b>Продукционная модель</b><span>Правила «если — то» и метапродукции.</span></li>
              <li><b>Реализация в ПО</b><span>Выбор среды, структура кода и ключевые фрагменты.</span></li>
              <li><b>Пример работы</b><span>Ввод, вопросы системы и финальная рекомендация.</span></li>
              <li><b>Заключение и источники</b><span>Результаты, развитие проекта и минимум 20 источников.</span></li>
            </ol>
          </div>
        </details>
      </section>

      <section className={`exam-section ${examReady ? 'is-ready' : ''}`} id="exam" aria-labelledby="exam-title">
        <div className="exam-orbit" aria-hidden="true"><span>ЭКЗ</span></div>
        <div className="exam-copy">
          <p className="kicker">Начало января</p>
          <h2 id="exam-title">{examReady ? 'Допуск открыт.' : 'Экзамен — за воротами.'}</h2>
          <p>{examReady ? 'Все обязательные этапы отмечены. Проверьте дату экзамена у преподавателя.' : 'Чтобы открыть допуск, сдайте все шесть лабораторных и защитите курсовую работу.'}</p>
        </div>
        <div className="exam-requirements">
          <div className={allLabsDone ? 'done' : ''}><span>{allLabsDone ? '✓' : '×'}</span><p><b>6 из 6 лабораторных</b><small>{allLabsDone ? 'Все сданы' : `${labs.filter((lab) => completed.includes(lab.id)).length} сдано сейчас`}</small></p></div>
          <div className={courseworkDone ? 'done' : ''}><span>{courseworkDone ? '✓' : '×'}</span><p><b>Курсовая защищена</b><small>{courseworkDone ? 'Условие выполнено' : 'Без неё допуска нет'}</small></p></div>
        </div>
      </section>

      <footer>
        <div>
          <span className="brand-mark">ИИ</span>
          <p><b>Интеллектуальные технологии и системы</b><small>Интерактивная карта студента · СГТУ</small></p>
        </div>
        <div className="source-links">
          <a href="https://docs.google.com/spreadsheets/d/1sgmVw-Pj7Vg7-z2pVq4O3uEMDqruHa6Ao4JxkIfFklA/edit" target="_blank" rel="noreferrer">План лекций ↗</a>
          <a href="https://docs.google.com/spreadsheets/d/1Q6rJBTbOrA57q6DPf9C4uCC2v6WLtBt4X6NhRtE6EKw/edit" target="_blank" rel="noreferrer">Лабораторные ↗</a>
          <a href="https://docs.google.com/document/d/1qiiVjMJMY2Q_OMR7zSoCi4pLYeJHXqoZ/edit" target="_blank" rel="noreferrer">Требования ↗</a>
        </div>
        <button className="reset-button" type="button" onClick={resetProgress}>Сбросить мой прогресс</button>
      </footer>
    </main>
  );
}
