import { useState, useEffect, useCallback } from 'react';
import { createFileRoute, useParams, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';

import { BossHPBar } from '../components/boss-battle/boss-hp-bar';
import { PlayerHPBar } from '../components/boss-battle/player-hp-bar';
import { BattleQuiz } from '../components/boss-battle/battle-quiz';
import { ComboIndicator } from '../components/boss-battle/combo-indicator';
import { ZiAbotHint } from '../components/boss-battle/ziabot-hint';
import { BattleResultScreen } from '../components/boss-battle/battle-result';
import { BossAvatar } from '../components/boss-battle/boss-avatar';
import { BattleLog } from '../components/boss-battle/battle-log';

import {
    mockBosses,
    mockBattleQuestions,
    mockUser,
    createInitialBattleState,
    calculatePlayerDamage,
    calculateBossDamage,
    calculateBattleXP,
    type BattleState,
    type BattleResult,
    type BattleQuestion
} from '../lib/mock-data';

export const Route = createFileRoute('/boss-battle/$battleId')({
    component: ActiveBattlePage,
});

function ActiveBattlePage() {
    const params = useParams({ strict: false });
    const battleId = params.battleId || '';

    const boss = mockBosses.find(b => b.id === battleId);
    const questions = mockBattleQuestions[battleId] || [];

    const [battleState, setBattleState] = useState<BattleState | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<BattleQuestion | null>(null);
    const [maxCombo, setMaxCombo] = useState(0);
    const [showBossDamage, setShowBossDamage] = useState(0);
    const [showBossRegen, setShowBossRegen] = useState(0);
    const [showPlayerDamage, setShowPlayerDamage] = useState(0);
    const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
    const [isStarting, setIsStarting] = useState(true);
    const [isTakingDamage, setIsTakingDamage] = useState(false);

    const partnerXP = 1800;
    const partnerName = "Partner AI";

    useEffect(() => {
        if (boss) {
            const initialState = createInitialBattleState(boss, mockUser.xp, partnerXP);
            setBattleState(initialState);

            if (questions.length > 0) {
                setCurrentQuestion(questions[0]);
            }

            setTimeout(() => {
                setIsStarting(false);
            }, 1500);
        }
    }, [boss]);

    const checkBattleEnd = useCallback((state: BattleState): 'victory' | 'defeat' | null => {
        if (state.bossCoreHP <= 0) return 'victory';
        if (state.playerHP <= 0 && state.partnerHP <= 0) return 'defeat';
        return null;
    }, []);

    const handleAnswer = useCallback((_selectedIndex: number, isCorrect: boolean) => {
        if (!battleState || !boss) return;

        setBattleState(prev => {
            if (!prev) return prev;

            let newState = { ...prev };
            newState.battleLogs = [...(prev.battleLogs || [])];
            newState.questionsAnswered++;

            if (isCorrect) {
                const damage = calculatePlayerDamage(prev.comboCount);

                if (prev.bossShieldHP > 0) {
                    newState.bossShieldHP = Math.max(0, prev.bossShieldHP - damage);
                    newState.battleLogs.push(`Shield rusak -${damage} HP!`);
                } else {
                    newState.bossCoreHP = Math.max(0, prev.bossCoreHP - damage);
                    newState.battleLogs.push(`Core terkena -${damage} HP!`);
                }

                newState.comboCount++;
                newState.correctAnswers++;

                setIsTakingDamage(true);
                setTimeout(() => setIsTakingDamage(false), 500);

                if (newState.comboCount > maxCombo) {
                    setMaxCombo(newState.comboCount);
                }

                setShowBossDamage(damage);
                setTimeout(() => setShowBossDamage(0), 1200);

                const corePercentage = (newState.bossCoreHP / newState.bossCoreMaxHP) * 100;
                if (corePercentage <= 40 && !prev.isRageMode) {
                    newState.isRageMode = true;
                    newState.battleLogs.push(`⚡ RAGE MODE AKTIF!`);
                }
            } else {
                const damage = calculateBossDamage(boss.baseDamage, prev.comboCount, prev.isPracticeBoss);

                // Regen based on layer state
                if (prev.bossShieldHP > 0) {
                    const regenAmount = Math.floor(prev.bossShieldMaxHP * 0.05);
                    const oldHP = prev.bossShieldHP;
                    newState.bossShieldHP = Math.min(prev.bossShieldMaxHP, prev.bossShieldHP + regenAmount);
                    const actualRegen = newState.bossShieldHP - oldHP;
                    if (actualRegen > 0) {
                        newState.battleLogs.push(`Shield +${actualRegen} HP`);
                        setShowBossRegen(actualRegen);
                        setTimeout(() => setShowBossRegen(0), 1200);
                    }
                } else {
                    const regenRate = newState.isRageMode ? 0.045 : 0.03;
                    const regenAmount = Math.floor(prev.bossCoreMaxHP * regenRate);
                    const oldHP = prev.bossCoreHP;
                    newState.bossCoreHP = Math.min(prev.bossCoreMaxHP, prev.bossCoreHP + regenAmount);
                    const actualRegen = newState.bossCoreHP - oldHP;
                    if (actualRegen > 0) {
                        newState.battleLogs.push(`Core +${actualRegen} HP${newState.isRageMode ? ' (RAGE)' : ''}`);
                        setShowBossRegen(actualRegen);
                        setTimeout(() => setShowBossRegen(0), 1200);
                    }
                }

                if (prev.playerHP > 0) {
                    newState.playerHP = Math.max(0, prev.playerHP - damage);
                    setShowPlayerDamage(damage);
                    newState.battleLogs.push(`Player -${damage} HP`);
                } else if (prev.partnerHP > 0) {
                    newState.partnerHP = Math.max(0, prev.partnerHP - damage);
                    newState.battleLogs.push(`Partner -${damage} HP`);
                }

                setTimeout(() => setShowPlayerDamage(0), 1200);
                newState.comboCount = 0;
            }

            const endResult = checkBattleEnd(newState);
            if (endResult) {
                newState.status = endResult;
                newState.battleLogs.push(endResult === 'victory' ? `🏆 MENANG!` : `💀 KALAH!`);

                const result: BattleResult = {
                    victory: endResult === 'victory',
                    xpEarned: 0,
                    questionsAnswered: newState.questionsAnswered,
                    correctAnswers: newState.correctAnswers,
                    maxCombo: maxCombo,
                    bossDefeated: endResult === 'victory' ? boss.name : undefined,
                };
                result.xpEarned = calculateBattleXP(result, newState.isPracticeBoss);

                setTimeout(() => {
                    setBattleResult(result);
                }, 500);
            } else {
                newState.currentQuestionIndex++;
                const nextIndex = newState.currentQuestionIndex % questions.length;
                setCurrentQuestion(questions[nextIndex]);
            }

            return newState;
        });
    }, [battleState, boss, questions, maxCombo, checkBattleEnd]);

    const handlePlayAgain = () => {
        setBattleResult(null);
        setMaxCombo(0);
        if (boss) {
            const initialState = createInitialBattleState(boss, mockUser.xp, partnerXP);
            setBattleState(initialState);
            setCurrentQuestion(questions[0]);
        }
    };

    if (!boss) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-slate-400 mb-4">Boss tidak ditemukan</p>
                    <Link to="/boss-battle">
                        <motion.button
                            className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium"
                            whileTap={{ scale: 0.95 }}
                        >
                            Kembali ke Lobby
                        </motion.button>
                    </Link>
                </div>
            </div>
        );
    }

    if (isStarting) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <BossAvatar
                        avatarColor={boss.avatarColor}
                        avatarIcon={boss.avatarIcon}
                        phase={1}
                    />
                    <h2 className="text-2xl font-bold text-slate-50 mb-2">{boss.name}</h2>
                    <p className="text-base text-slate-400 mb-1">{boss.topic}</p>
                    {boss.isPractice && (
                        <p className="text-sm text-amber-400 mt-3">🛡️ Mode Latihan</p>
                    )}
                </motion.div>
            </div>
        );
    }

    if (!battleState) return null;

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${battleState.isRageMode ? 'bg-gradient-to-b from-red-950 to-slate-950' : 'bg-slate-950'
            }`}>
            <AnimatePresence>
                {battleResult && (
                    <BattleResultScreen
                        result={battleResult}
                        bossName={boss.name}
                        isPractice={battleState.isPracticeBoss}
                        onPlayAgain={handlePlayAgain}
                    />
                )}
            </AnimatePresence>

            <div className={`sticky top-0 z-30 glass-strong border-b transition-colors duration-500 pb-4 ${battleState.isRageMode ? 'border-red-800/50' : 'border-slate-800/50'
                }`}>
                <div className="flex items-center gap-3 px-4 pt-3 pb-2">
                    <Link to="/boss-battle">
                        <motion.button
                            className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-slate-400" />
                        </motion.button>
                    </Link>
                    <div className="flex-1 text-center">
                        <h1 className={`text-base font-semibold transition-colors ${battleState.isRageMode ? 'text-red-400' : 'text-slate-50'}`}>
                            {boss.topic}
                        </h1>
                        <p className="text-xs text-slate-400">{boss.subject}</p>
                    </div>
                    <div className="w-10" />
                </div>

                <div className="px-4 mt-4">
                    <BossAvatar
                        avatarColor={boss.avatarColor}
                        avatarIcon={boss.avatarIcon}
                        phase={battleState.bossPhase}
                        isRageMode={battleState.isRageMode}
                        isTakingDamage={isTakingDamage}
                    />
                    <BossHPBar
                        shieldHP={battleState.bossShieldHP}
                        shieldMaxHP={battleState.bossShieldMaxHP}
                        coreHP={battleState.bossCoreHP}
                        coreMaxHP={battleState.bossCoreMaxHP}
                        bossName={boss.name}
                        phase={battleState.bossPhase}
                        isRageMode={battleState.isRageMode}
                        showDamage={showBossDamage}
                        showRegen={showBossRegen}
                    />
                </div>
            </div>

            <div className="my-4 px-4">
                <BattleLog logs={battleState.battleLogs || []} />
            </div>

            <div className="flex-1 px-4 flex flex-col gap-4">
                <div className="flex justify-center">
                    <ComboIndicator
                        comboCount={battleState.comboCount}
                        showBonusDamage={battleState.comboCount > 0}
                    />
                </div>

                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {currentQuestion && (
                            <BattleQuiz
                                key={currentQuestion.id + battleState.currentQuestionIndex}
                                question={currentQuestion}
                                questionNumber={(battleState.currentQuestionIndex % questions.length) + 1}
                                totalQuestions={questions.length}
                                onAnswer={handleAnswer}
                                disabled={battleState.status !== 'active'}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex justify-center pb-4">
                    <ZiAbotHint
                        questionHint={currentQuestion?.hint}
                        cooldownSeconds={battleState.isRageMode ? 30 : 20}
                    />
                </div>
            </div>

            <div className={`sticky bottom-0 glass-strong border-t transition-colors p-4 ${battleState.isRageMode ? 'border-red-800/50' : 'border-slate-800/50'
                }`}>
                <div className="flex gap-3 max-w-md mx-auto">
                    <PlayerHPBar
                        currentHP={battleState.playerHP}
                        maxHP={battleState.playerMaxHP}
                        playerName={mockUser.name}
                        totalXP={mockUser.xp}
                        showDamage={showPlayerDamage}
                    />
                    <PlayerHPBar
                        currentHP={battleState.partnerHP}
                        maxHP={battleState.partnerMaxHP}
                        playerName={partnerName}
                        totalXP={partnerXP}
                        isPartner
                    />
                </div>
            </div>
        </div>
    );
}

export default ActiveBattlePage;
