-- Seed data for achievements

-- Prediction Achievements
INSERT INTO achievements (name, description, icon, rarity, xp_reward, condition_type, condition_value) VALUES
('İlk Adım', 'İlk tahmini yap', '🎪', 'common', 25, 'predictions_made', 1),
('Ateş Topu', '5 üst üste doğru', '🔥', 'rare', 100, 'streak', 5),
('Şimşek', '10 üst üste doğru', '⚡', 'epic', 500, 'streak', 10),
('Yıldız', 'Aylık %80+ doğruluk', '🌟', 'epic', 300, 'monthly_accuracy', 80),
('Altın Tahmin', '100 doğru tahmin', '🏆', 'rare', 250, 'correct_predictions', 100),
('Mükemmeliyetçi', '%90+ doğruluk (min 50 tahmin)', '💯', 'legendary', 1000, 'accuracy_with_min', 90);

-- Time Achievements
INSERT INTO achievements (name, description, icon, rarity, xp_reward, condition_type, condition_value) VALUES
('Sadık Kullanıcı', '7 gün üst üste giriş', '📅', 'common', 100, 'login_streak', 7),
('Aylık Aktif', '30 gün üst üste giriş', '🗓️', 'rare', 500, 'login_streak', 30),
('Yıl Dönümü', '1 yıl üye', '🎂', 'epic', 1000, 'account_age_days', 365);

-- Premium Achievements
INSERT INTO achievements (name, description, icon, rarity, xp_reward, condition_type, condition_value) VALUES
('VIP Üye', 'VIP üyelik satın al', '💎', 'rare', 500, 'subscription', 3),
('Pro Üye', 'Pro üyelik satın al', '🌟', 'common', 200, 'subscription', 2),
('Erken Destekçi', 'İlk 100 VIP üyesinden biri ol', '🎁', 'legendary', 2000, 'early_vip', 100);

-- League Achievements
INSERT INTO achievements (name, description, icon, rarity, xp_reward, condition_type, condition_value) VALUES
('Premier Uzmanı', 'Premier League''de 50 doğru', '⚽', 'rare', 300, 'league_correct_predictions', 50),
('La Liga Bilgesi', 'La Liga''da 50 doğru', '🇪🇸', 'rare', 300, 'league_correct_predictions', 50),
('Serie A Maestro', 'Serie A''da 50 doğru', '🇮🇹', 'rare', 300, 'league_correct_predictions', 50),
('Bundesliga Kralı', 'Bundesliga''da 50 doğru', '🇩🇪', 'rare', 300, 'league_correct_predictions', 50),
('Süper Lig Aşığı', 'Süper Lig''de 50 doğru', '🇹🇷', 'rare', 300, 'league_correct_predictions', 50);

-- Special Achievements
INSERT INTO achievements (name, description, icon, rarity, xp_reward, condition_type, condition_value) VALUES
('Risk Avcısı', '10 yüksek riskli tahmin doğru', '🎰', 'epic', 500, 'high_risk_correct', 10),
('Dark Horse', '5 sürpriz tahmin doğru (underdog)', '🐎', 'epic', 400, 'underdog_correct', 5),
('Keskin Nişancı', '20 over/under doğru', '🎯', 'rare', 250, 'over_under_correct', 20);
