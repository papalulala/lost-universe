import { openEcho } from './echo.js?v=lost-messages';
import { mountInk } from './ink.js?v=paint-first';

const items = [
  {id:'shadow',title:'留在牆上的影子',tag:'影子',story:'巷口的燈亮起來時，我正抬手跟你道別。你說我的影子比我先揮手。我退回去試了一次，燈已經熄了，手還舉在半空。'},
  {id:'sprout',title:'窗縫裡的小樹芽',tag:'小樹芽',story:'你把一粒種子塞進窗縫，叫我別急著掃掉。後來我每天開窗都避開那一角。搬家那早，兩片小葉剛好張開，還托著一點水。',weather:'clearing'},
  {id:'smile',title:'忘在相紙外的微笑',tag:'微笑',story:'你說相片拍好了，我才笑出來。我們低頭看顯影的相紙，上面兩個人都端端正正。你用指甲在白邊劃了一下，說就把剛才那個笑留在這裡。'},
  {id:'key', title:'藍膠帶鑰匙', tag:'搬家後留下的東西',
    story:'搬家那天，我用藍膠帶把這把鑰匙和新家的分開。三年來，我一直把兩把掛在一起。\n\n上週經過那棟樓，大門已經換成刷卡的了。回家才發現，鑰匙圈上只剩新家的那把。'},
  {id:'postcard',weather:'wind', title:'沒寄出的明信片', tag:'寫到一半的東西',
    story:'明信片上只有一句「我今天走到海邊了」。原本想等浪小一點，再補一句海是什麼顏色。\n\n退房那天，我把它夾進床邊的旅遊手冊。回家整理行李時，才摸到口袋裡的郵票。'},
  {id:'film', title:'半卷底片', tag:'搬家後留下的東西',
    story:'最後一張是搬家前的廚房。冰箱搬走以後，牆上有一塊比四周還白的長方形。\n\n那卷拍到一半的底片，我記得放在窗台上。新家拆完最後一箱，我才想起那扇窗。'},
  {id:'spoon',title:'舊家的湯匙',tag:'搬家後留下的東西',story:'這把湯匙碰到碗邊，會響很輕的一聲。搬走後第一次煮湯，我在新家的抽屜裡翻了兩遍，才想起它還晾在舊家的水槽旁。'},
  {id:'button',title:'四孔鈕扣',tag:'衣袋裡的東西',story:'媽媽把備用鈕扣縫在大衣內側，用的是一截比較粗的線。送洗回來，線還在，四個孔裡卻什麼也沒有了。'},
  {id:'ticket',title:'沒有剪角的車票',tag:'離開後才發現',story:'我從衣袋摸出回程票，擱在椅袋裡的報紙旁。下車只帶走報紙，直到站務員伸出手，我才想起椅袋裡還有一張票。'},
  {id:'comb',title:'少一齒的梳子',tag:'離開後才發現',story:'梳子少了第五齒，梳到耳後時總會卡一下。離開旅館後我在車窗上看見頭髮翹起來，才想起浴室架上的它。'},
  {id:'notebook',title:'夾著書籤的筆記本',tag:'做到一半的東西',story:'我在最後一頁畫了一個還沒合起來的圓。圖書館關門時，把書籤夾回那頁。隔天回去，窗邊已經有人坐了，桌上只有他自己的書。'},
  {id:'umbrella',weather:'clearing',title:'繫帶鬆了的傘',tag:'離開後才發現',story:'雨停後我把傘橫擱在站牌下的長椅上。直到下一場雨，我才想起那條怎麼拉都拉不緊的繫帶。'},
  {id:'tape',title:'沒錄完的錄音帶',tag:'做到一半的東西',story:'錄到一半，門外有人叫我吃飯。後來我收起錄音機，忘了那盒卡帶還躺在窗邊，停在一句「等一下」。'},
  {id:'stamp',title:'刻了一半的印章',tag:'做到一半的東西',story:'我的名字刻到第三刀，手一滑，多留了一道斜線。工作室清空後，我才發現帶回來的是刻刀，印章留在木屑裡。'},
  {id:'eraser',title:'紙套翹起的橡皮擦',tag:'衣袋裡的東西',story:'我總用拇指把紙套的角壓平。放學跑回家，手伸進制服口袋，裡面只剩一小片擦下來的紙。'},
  {id:'mirror',title:'袖珍手鏡',tag:'離開後才發現',story:'鏡面有一道細痕，照到右耳時，我總會把鏡子往左偏一下。離開旅館後，我想看一眼頭髮，伸進袋裡的手只碰到空的鏡套。'},
  {id:'bookmark',title:'對摺的書籤',tag:'做到一半的東西',story:'我把書籤對摺，在摺痕旁畫一道鉛筆線，記住故事停在哪一行。還書時忘了抽出它。下次借到同一本書，那一頁平平地攤開，書籤已經不在了。'},
  {id:'envelope',title:'拆封的信封',tag:'離開後才發現',story:'拆信時，我沿著封口撕出一排毛邊。信帶回家了。後來想抄回信地址，才想起信封還擱在郵局的窗台。'},
  {id:'luggage',title:'地址寫了一半的行李牌',tag:'離開後才發現',story:'地址卡寫到門牌前，我就被催著上車。到家才看見行李箱的提把上只剩一道勒痕。幸好還沒寫到門牌。我甚至不知道該不該盼有人撿到。'},
  {id:'earbuds',title:'繞成圈的有線耳機',tag:'做到一半的東西',story:'耳機線在分岔下面繞成一個鬆鬆的圈，我一直懶得理順。磁帶翻面時，我把耳機擱在車窗下。下車後，手裡只有收好的隨身聽。'},
  {id:'pencil',title:'削到握不住的短鉛筆',tag:'衣袋裡的東西',story:'鉛筆短到只能用兩根手指捏著，我還是把它放進制服口袋。放學後想在車票背面記一句話，才發現口袋裡只有橡皮擦屑。'},
  {id:'thimble',title:'縫到一半的頂針',tag:'做到一半的東西',story:'縫到大衣的最後一顆鈕扣，針尖在頂針的小凹點裡卡了一下。門外有人喊我，剩下兩針就先擱著。隔天打開針線盒，才發現頂針還留在那張桌上。'},
  {id:'watch',title:'停在六點十八分的手錶',tag:'離開後才發現',story:'錶早就停在六點十八分，我還是每天戴著。那天為了搬行李，把它解下來擱在車站洗手台。上車後我抬起手腕，才看見錶帶留的一圈淡痕。'},
  {id:'matchbox',title:'還剩三根的火柴盒',tag:'搬家後留下的東西',story:'舊家的爐火點不著時，我總伸手去摸火柴盒。搬家那天，盒裡還有三根。新家第一次煮湯，手伸出去，我才想起它還擱在舊廚房的窗邊。'},
  {id:'glasses',title:'起霧的眼鏡',tag:'離開後才發現',weather:'fog',story:'一進暖的地方，鏡片就白了。我把眼鏡放在窗邊，等霧退一點。車開了，我想擦掉左邊最後一點霧，伸手卻只摸到眼鏡布。'},
  {id:'mitten',weather:'snow',title:'落單的手套',tag:'衣袋裡的東西',story:'左手手套的拇指旁補過一針，戴上去總能摸出來。等車時我脫了手套找零錢。回家把兩隻手伸進大衣口袋，只有右手摸到一團毛線。'},
  {id:'bell',title:'有一道刮痕的自行車鈴',tag:'離開後才發現',story:'鈴上那道刮痕，是牽車經過窄門時留下的。送修那天，師傅把鈴拆下來擱在桌角。騎回家的路上，前面有人擋住巷口。我伸拇指去按，只碰到空空的把手。'},
  {id:'spool',title:'鬆了一截的線軸',tag:'做到一半的東西',story:'木線軸滾到桌腳，拖出長長一截線。我把它塞進縫到一半的袖子裡。後來袖子拿去改短，拆下來的布拿回了家，線軸還留在裁縫店。'},
  {id:'whistle',weather:'wind',title:'吹過最後一聲的哨子',tag:'離開後才發現',story:'收隊時我吹了兩聲，第二聲被風拖得很長。我把哨子從繩圈解下，擱在長椅上，轉身去收球。隔天穿上外套，拉鍊上只掛著那截空繩。'},
  {id:'coin',title:'磨薄的硬幣',tag:'衣袋裡的東西',story:'那枚硬幣的邊緣磨得很滑，我閉著眼也摸得出來。月台上的販賣機把它退回來兩次。我把它擱在出幣口旁，車來了，就忘了把它拿起來。'},
  {id:'clothespin',title:'咬著一根棉線的衣夾',tag:'做到一半的東西',story:'收床單時，我把一枚木衣夾擱在陽台欄杆上。它還咬著從床單角落扯下來的一截線。夜裡我想起那枚衣夾，出去一看，欄杆上只剩一塊淺淺的印子。'},
  {id:'pencap',title:'落在借書桌上的筆蓋',tag:'離開後才發現',story:'我把還書日期抄在借閱單上，鋼筆順手塞回胸袋。走到樓下，手往口袋一摸，指尖染了一點墨。筆蓋大概還在桌上，跟那張借閱單一起。'},
  {id:'safetypin',title:'替裙襬撐了一晚的別針',tag:'做到一半的東西',story:'出門前裙襬開了線，我從抽屜摸出一枚別針，從內側扣上。回家時裙襬又垂下來了。我扶著牆，一階一階往回找。掌心最後沾上的，只有剝落的漆。'},
  {id:'shoehorn',title:'門邊少了一支鞋拔',tag:'離開後才發現',story:'門背後有一個釘子，鞋拔掛在那裡，開門時總會碰一下。搬家的那天我兩手抱著紙箱，門一開，竟然沒有聲音。'},
  {id:'domino',title:'五點對一點的骨牌',tag:'做到一半的東西',story:'那局只差一張牌。桌腳不平，我趁他倒茶，把手裡的五一塞到桌腳底下。隔週再去，桌子換了地方，地板上只有一塊淺色的方印。'},
  {id:'bottlecap',title:'被撬翹一角的瓶蓋',tag:'衣袋裡的東西',story:'我們在堤岸開了兩瓶汽水。她撿起被撬翹的瓶蓋當成籌碼，說下一局要贏回來。回家洗外套前，我摸遍口袋，只找得到一枚磨薄的硬幣。'},
  {id:'teaball',title:'沒掛回杯耳的濾茶球',tag:'離開後才發現',story:'她總把小環掛在杯耳上，才不會讓細鏈滑進茶裡。那天收桌，我把杯子一個個疊好，聽見水槽裡叮了一聲。第二天茶葉還在，濾茶球不見了。'},
  {id:'shuttle',title:'還留一截線的織梭',tag:'做到一半的東西',story:'借來的織機要送回去，我把梭子抽出來。梭腹還拖著一截線，勾在沒織完的布邊。我解開線，把布包好。回到家拆開包袱，才想起梭子還擱在織機旁。'},
  {id:'doorstop',title:'尖角磨白的門擋',tag:'離開後才發現',story:'搬箱子那天，我用門擋撐著走廊的門。最後一趟回去，門在身後闔上。我彎下腰，地上只有那道被橡膠拖出來的短痕。'},
  {id:'harmonica',title:'吹到一半收起的口琴',tag:'做到一半的東西',story:'等末班車時，他教我把一句曲子吹到換氣的地方。車燈從轉角亮起來，我把口琴擱在椅面上去招手。那半句旋律，後來每次想起來，都停在同一個地方。'},
  {id:'curtainring',title:'窗簾少掉的那一環',tag:'搬家後留下的東西',story:'拆窗簾時，掛環一個一個滑進紙袋。最後一枚掉下去，輕輕碰了窗台一下。我再去摸窗台，指尖只有一點灰。窗還開著，風把剩下的灰吹散了。'},
  {id:'dater',title:'還停在昨天的日期章',tag:'做到一半的東西',story:'閉館前我把日期章轉回昨天，替一張漏蓋的借閱單補印。關燈時忘了把它轉回來。隔天桌上換了新印臺，昨天的日期和那枚舊章一起不見了。'},
  {id:'magnifier',title:'翻開後忘了合上的放大鏡',tag:'做到一半的東西',story:'地圖上的巷名太小，我把放大鏡從殼裡翻出來，壓住折痕。走到那條巷子，我想再核對一次小字，才想起放大鏡還攤在桌上。'},
  {id:'darner',title:'替襪跟撐住一個洞的補襪木蛋',tag:'做到一半的東西',story:'襪跟破了，我把木蛋塞進去，把洞撐成一個小圓。那天只補好一隻。搬走針線籃時，沒補完的那隻還反扣在椅背上，後來連木蛋也沒帶回來。'},
  {id:'pedal',title:'外角磨掉一塊的踏板',tag:'離開後才發現',story:'右腳踏板的外角曾擦到矮牆，少了一小塊橡膠。師傅換下來，順手擱在修車攤的木箱上。我騎出巷口才記起，本來想把舊的帶回去。'},
  {id:'measure',title:'還露著一截的捲尺',tag:'做到一半的東西',story:'改袖口前，她借我的小捲尺量手腕，叫我別縮手。試完我先去趕車。回家想補記尺寸，摸遍口袋，才想起捲尺留在裁縫桌上，還露著一截。'},
  {id:'yoyo',title:'還沒捲回去的溜溜球',tag:'做到一半的東西',story:'操場快關門時，我蹲在台階上解繩結。好不容易把最後一圈鬆開，有人在鐵門那頭喊我。我把繩頭往球身一擱，想說明天再慢慢捲。隔天只找到了那級台階。'},
  {id:'teatin',title:'蓋子總闔不緊的茶罐',tag:'搬家後留下的東西',story:'倒完最後一撮茶葉，我又按了按罐蓋。它還是翹起一小截，像以前每一次那樣。搬家後打開紙箱，裡面有兩個杯子，沒有那只空罐。'},
  {id:'padlock',title:'鎖梁還翹著的掛鎖',tag:'搬家後留下的東西',story:'搬走最後一箱書時，我把掛鎖打開，擱在鐵門旁的窗台。回頭拉門，手裡只有鑰匙。下一次經過，門已換了，窗台還在。'},
  {id:'castanets',title:'鬆了一個結的響板',tag:'做到一半的東西',story:'練到第三遍時，拇指上的繩結鬆了。我把響板放在舞蹈教室的窗台，想等休息時再綁。下課後我摸到包裡的譜，才想起少了那兩片木頭。'},
  {id:'cankey',title:'捲完最後一圈的開罐匙',tag:'離開後才發現',story:'午餐前我把鐵皮舌片穿進匙上的細縫，一圈一圈把罐頭捲開。收拾時，空罐先進了回收桶。下次我捏住舌片，才想起開罐匙還擱在上次那張桌上。'},
  {id:'clothesbrush',title:'少了兩撮毛的衣刷',tag:'離開後才發現',story:'下雪那天進門前，我在樓梯口刷掉大衣上的雪。刷到肩頭，缺了兩撮毛的地方總會漏過一小片。我把衣刷擱在窗台上。隔天穿大衣出門，肩頭融雪留下的水痕已經乾了，手往窗台一摸，只摸到冰涼的石頭。'},
  {id:'hairclip',title:'扣上時會輕響的髮夾',tag:'離開後才發現',story:'洗臉前我把髮夾從耳邊取下來，順手扣上。那一聲很輕，我以為自己已經把它收進袋裡。下樓照玻璃門時，頭髮垂了下來，才想起洗手台的邊緣。'},
  {id:'plugfuse',title:'留在停電那晚的瓷保險絲',tag:'搬家後留下的東西',story:'那晚樓梯間的燈全滅了。電工把換下來的瓷保險絲交給我，我擱在電表下的小木板上，想留著給房東看。後來搬走前經過那裡，燈亮著，木板上卻只有一圈灰。'},
  {id:'slingshot',title:'橡皮筋鬆垂的木彈弓',tag:'做到一半的東西',story:'我從兩根岔枝裡挑了比較歪的那根，磨了一下午。橡皮筋綁好，垂在兩個枝頭之間。我把它擱在後院的矮牆上，回屋找剪刀。再出來時，牆上只剩兩小堆木屑。'},
  {id:'travelcup',title:'沒壓回去的摺疊杯',tag:'離開後才發現',story:'在車站喝完水，我把杯子放在飲水機旁，等它滴乾再壓回去。聽見廣播就跑去月台。上車後我從袋裡摸出扁扁的杯蓋，才想起杯身還一圈一圈張著。'},
  {id:'bikepump',title:'軟管捲不起來的打氣筒',tag:'離開後才發現',story:'前輪沒氣，我在巷口蹲下來打了幾下。那截軟管彎久了，總是翹出來。我把打氣筒橫放在階梯上，騎出去試車。回來時，台階上只剩一道輪胎印。'},
  {id:'shoelast',title:'留在修鞋攤的木鞋楦',tag:'離開後才發現',story:'父親修鞋時總讓我扶住鞋楦，他自己用指腹把鞋跟一點一點推平。收攤那天我只顧著把修好的鞋裝箱。再掀開帆布，桌面上還有個鞋尖形的淺印。'},
  {id:'deskbell',title:'櫃檯上那一下沒人應的鈴',tag:'離開後才發現',story:'退房那天，我把手指放在鈴頂上，按了一下。樓上有人拖動椅子，櫃檯還是空的。旅館歇業後我回去幫忙收東西，櫃檯上只剩一圈沒落灰的地方。'},
  {id:'compass',title:'忘了把蓋子闔上的指南針',tag:'做到一半的東西',story:'走到步道分岔口，我掀開指南針的蓋子，把它和地圖一起擱在石欄上。朋友在前面喊我，我抓起地圖跟上去。等我回到岔口，石欄已經曬熱了。地圖還在手裡，那枚指南針卻不見了。'},
  {id:'accesscard',title:'刷不回那扇門的感應卡',tag:'搬家後留下的東西',story:'大樓換成刷卡進出後，我把感應卡和鑰匙放在同一個口袋。搬走那天，我在門邊的小平台上放下卡片，騰出手去提紙箱。到新家才發現，口袋裡只剩鑰匙硌著手。'},
  {id:'phone',title:'訊息還沒送出的手機',tag:'做到一半的東西',story:'我打了「我到了」，還沒按送出，就把手機擱在候車椅上，起身去接人。後來想補一句「你在哪裡」，手伸進袋裡，只摸到一團沒解開的耳機線。'},
  {id:'instantphoto',title:'拍下空長椅的拍立得照片',tag:'離開後才發現',story:'相紙剛吐出來時，椅背只是一團白。我把它擱在旁邊的矮牆上等顯影，跑回屋裡拿筆，想在底下寫日期。再出來時，相紙不見了，長椅還空著。'},
  {id:'snips',title:'還張著口的裁縫剪',tag:'做到一半的東西',story:'剪到袖口那一圈，她叫我先別動。我把剪刀擱下去取別針，回來時桌上的布已經捲起來了。後來拆開那卷布，找到了剪落的線頭，沒找到剪刀。'},
  {id:'foldrule',title:'只折回兩節的木尺',tag:'做到一半的東西',story:'搬書櫃之前，我用木尺量門框。折回第二節時，有人在樓下按喇叭。我把它擱在門邊，先下樓開門。回來時書櫃已經搬走，門邊只剩一道鉛筆記號。'},
  {id:'roomtag',title:'刻著五十五號的房牌',tag:'離開後才發現',story:'退房前我把鑰匙從鬆掉的圈上取下，先還到櫃檯。那枚房牌還在窗邊，我本來想一起帶下樓。車開到下一站，我才想起窗台上的五十五號。'},
  {id:'inkbottle',title:'標籤翹了一角的墨水瓶',tag:'做到一半的東西',story:'郵局要打烊了，櫃員把我的信封推回來。「這裡還少一個字。」我從袋裡掏出墨水瓶，把翹起的標籤轉向自己，免得它勾住袖口。補上的字比前面幾個都深。\n\n隔天我想把那個地址抄下來，筆尖在紙上刮了兩下。這才想起，昨天急著把信推進窗口時，我把墨水留在了外面。'},
  {id:'torch',title:'滑鈕磨平的手電筒',tag:'離開後才發現',story:'樓梯停電的那晚，樓下的孩子隔著門喊：「你照地上，我看不到鞋。」手電筒的滑鈕早磨平了，我用指甲推了兩次才亮。我把它擱在電表下，讓光順著台階往下照。\n\n隔天樓梯燈修好了。孩子還站在同一扇門前，這回自己繫好了鞋帶。我去拿手電筒，手指只摸到木板上的灰。'},
  {id:'ticketpunch',title:'最後一下打空的驗票鉗',tag:'做到一半的東西',story:'末班車只剩一個孩子。他把票遞過來，又縮回去：「能不能留著給我弟看？」我本來已經張開鉗口，聽完就把手挪到一旁。鉗子喀噠一聲，票角還好好的。\n\n終點站換班，我把驗票鉗擱在前排椅袋旁。第二天來接班的是另一輛車。我下意識伸手去摸，手心還記得那一下打空的力道。'},
  {id:'spinningtop',title:'繩子只繞了半圈的陀螺',tag:'做到一半的東西',story:'廟埕的石板有條縫，阿公叫我站遠一點。「讓它自己找地方停。」我把繩子重新纏上去，才繞半圈，廟門裡就有人喊他。阿公把陀螺擱到石獅腳邊，牽我進去。\n\n散場後我跑回去，石獅的腳背還是熱的，底下卻空了。我捏著沒纏上去的那一頭繩子，在那條石縫旁站了好一會。'},
  {id:'foldingfan',title:'缺了一小角的摺扇',tag:'離開後才發現',story:'戲散了，母親還坐著替我搧風。扇子每掠過一次，缺角的那一摺就輕輕刮一下她的袖口。我說回家拿紙補，她把扇子插進椅背的縫裡，先幫我繫鞋帶。\n\n走到街口，我伸手替她拿扇子。她攤開手，兩個人都停了一下。身後的戲台已經開始收椅子。'},
  {id:'vestacase',title:'底部磨亮的火柴匣',tag:'搬家後留下的東西',story:'停電時，父親讓我摸火柴匣的底。「粗的那面朝外。」我擦了兩次才亮，火光照見匣底有一道被磨得發亮的地方。燈一亮，他把匣子擱到窗台上，順手把火吹熄。\n\n多年後回去交鑰匙，我伸手摸那個窗台。漆刷過一層又一層，原來放匣子的地方摸起來一樣平。'},
  {id:'drawerpull',title:'被拇指磨亮的抽屜拉環',tag:'搬家後留下的東西',story:'祖母找藥時不用開燈。她的拇指往下一勾，拉環便碰在銅片上，叩一聲，我就知道她又睡不著。搬走那天，抽屜卡住了，我用力一扯，拉環連著螺絲一起掉進掌心。\n\n我把它放回空抽屜裡，想等清點完再裝。搬家公司把櫃子抬過門檻時，裡頭也叩了一聲。我竟然下意識地問她，要不要喝水。'},
  {id:'needlecase',title:'沒蓋上的木針筒',tag:'做到一半的東西',story:'戲還有兩分鐘開場，孩子的袖口卻裂了。我拔開木針筒的蓋子，挑最短的一根針。她把手伸得直直的，問我：「縫完我還能把手舉高嗎？」我叫她先試一次，縫線跟著袖子一起抬了起來。\n\n幕一拉開，我把針收回筒裡，蓋子擱在旁邊。散場收桌的人把布一掀，我才看見桌面上只有一小截線。'},
  {id:'photoslide',title:'投在牆上時倒過來的幻燈片',tag:'做到一半的東西',story:'父親把幻燈片插反了。舊家的屋簷倒掛在牆上，我們笑得連投影機的風扇聲都聽不見。他用鉛筆在紙框角上畫了一個小記號，說下回就知道哪面朝上。\n\n收機器時，我把那張挑出來，想留著多看一眼。好多年後，白牆早拆了，我還記得倒過來的屋簷，卻想不起紙框最後放在哪裡。'},
  {id:'hanger',title:'右肩磨亮的木衣架',tag:'搬家後留下的東西',story:'戲院的衣帽間快收了，最後一位客人卻回頭問：「這是我的嗎？」我照著號碼把外套遞給她。取衣服時，袖子在衣架磨亮的右肩上滑了一下，那動靜我聽了十幾年。\n\n第二天戲院封門，我回去拿便當盒。鐵桿已經拆下來，平放在地上。那只衣架原本掛在最外側，現在連掛鉤都找不到。我第一次看見那面牆上，所有掛過東西的地方都比四周白。'},
  {id:'tyrelever',title:'尖端磨白的撬胎棒',tag:'離開後才發現',story:'補胎時，我弟蹲在路邊幫我扶車。「你先騎一圈，我在這裡等。」他把撬胎棒從輪框抽出來，金屬尖擦過一道白痕，便順手擱在矮牆上。\n\n我繞回來時，他已經提著工具袋往前走了。我追上去問他收齊了沒。他掂掂袋子，說差不多。我們騎到下一個坡頂才一起停下來。他拉開袋口，我們數了一遍。少的那支，還在剛才的矮牆上。'},
  {id:'tally',title:'轉回零的手按計數器',tag:'做到一半的東西',story:'最後一場放映，我替戲院數進場的人。母親來得晚，站在門口朝我揮手。我數到她時停了一下，然後照樣按下去。\n\n散場後，老闆說：「歸零吧，明天不用數了。」我轉動側邊的小輪，四格一起跳回零。我把它留在桌角，推門出去時，拇指還在空空的掌心裡按了一下。'}
];

const trails = {
  shadow:['看看窗縫裡留下了什麼','sprout','smile'],
  sprout:['看看那張拍慢了的照片','smile','shadow'],
  smile:['循著牆上的影子走','shadow','sprout'],
  key:['搬家後留下的東西','shoehorn','film'],
  postcard:['還沒寄出的那句話','envelope','notebook'],
  film:['還沒來得及看清的畫面','instantphoto','curtainring'],
  spoon:['吃完飯，罐裡還剩多少茶？','teatin','teaball'],
  button:['穿過那四個孔的針','thimble','notebook'],
  ticket:["票袋裡還有什麼？","coin","ticketpunch"],
  comb:['耳後還留著什麼？','hairclip','mirror'],
  notebook:['看看地圖上那行小字','magnifier','postcard'],
  umbrella:['一隻手撐傘，另一隻手找零錢','mitten','ticket'],
  tape:["倒帶後聽見誰？","harmonica","film"],
  stamp:['第三刀之後，還有一筆','notebook','tape'],
  eraser:['口袋裡剩下的一點碎屑','pencil','button'],
  mirror:['樓下是哪一聲鈴？','deskbell','umbrella'],
  bookmark:['翻到還沒讀完的那一頁','notebook','tape'],
  envelope:['地址旁那一點墨','pencap','postcard'],
  luggage:['提把上的勒痕，手腕上的淡痕','watch','ticket'],
  earbuds:['線的另一頭接著什麼？','phone','tape'],
  pencil:['鉛筆寫過的地方，還留著什麼？','eraser','button'],
  thimble:['線頭要用什麼剪掉？','snips','spool'],
  watch:['上車後，才發現少了一樣','luggage','ticket'],
  matchbox:['燈還沒亮起來時','vestacase','plugfuse'],
  glasses:['得湊近才看得清','magnifier','mirror'],
  mitten:['進門前的大衣','clothesbrush','button'],
  bell:['修車攤上還留了什麼？','pedal','whistle'],
  spool:['那截沒捲回去的線','yoyo','shuttle'],
  whistle:['聲音一停，手還會去找','harmonica','bell'],
  coin:["喝口水再走","travelcup","luggage"],
  clothespin:['被扯鬆的那一截線','spool','thimble'],
  pencap:['手指上的那一點墨','inkbottle','dater'],
  safetypin:['裙襬後來用什麼縫上？','thimble','spool'],
  shoehorn:['留下來的鞋跟形狀','shoelast','padlock'],
  domino:['下一局拿什麼當籌碼？','bottlecap','coin'],
  bottlecap:['手一鬆，原本捏著的東西去哪了？','cankey','domino'],
  teaball:['喝茶以前，碗邊響過什麼？','spoon','spoon'],
  shuttle:['布邊還牽著哪一截線？','spool','clothespin'],
  doorstop:['舊門旁還擱著什麼？','padlock','shoehorn'],
  harmonica:["下一拍由誰接？","castanets","deskbell"],
  curtainring:['窗台上還留著什麼？','film','envelope'],
  dater:['借書時留下的記號','pencap','bookmark'],
  magnifier:['在岔路口辨一辨方向','compass','luggage'],
  darner:['收拾針線以前','snips','thimble'],
  pedal:['換完踏板，先替前輪打氣','bikepump','bell'],
  measure:['尺寸還沒記下來','foldrule','watch'],
  yoyo:['聽聽石板上還有什麼在轉','spinningtop','slingshot'],
  teatin:['最後一撮茶要放進哪裡？','teaball','spoon'],
  padlock:['哪張卡能開下一扇門？','accesscard','key'],
  castanets:["把這一遍留下來","tape","harmonica"],
  cankey:['罐子開了，手裡還有什麼？','bottlecap','teatin'],
  clothesbrush:['看看哪把傘還在滴水','umbrella','hanger'],
  hairclip:['耳邊少了什麼？','comb','earbuds'],
  plugfuse:['摸黑時擦亮的第一根火柴','vestacase','matchbox'],
  slingshot:['找找還沒收好的那截繩','yoyo','castanets'],
  travelcup:["廣播響起之後","ticket","teaball"],
  bikepump:['工具袋裡少了哪一件？','tyrelever','pedal'],
  shoelast:['腳跟還記得的形狀','shoehorn','darner'],
  deskbell:['鈴響以前，哪個房號還沒交回？','roomtag','key'],
  compass:['把走過的路記下來','notebook','postcard'],
  accesscard:['搬最後一箱時，什麼撐著門？','doorstop','ticket'],
  phone:['那句話後來有寄出去嗎？','postcard','envelope'],
  instantphoto:['把那格影像留久一點','photoslide','film'],
  snips:['剪刀旁還差一根針','needlecase','safetypin'],
  foldrule:['量過的那道門框','measure','pencil'],
  roomtag:['那位房客在玻璃前停了多久？','mirror','deskbell'],
  inkbottle:['那個顏色特別深的字','envelope','pencap'],
  torch:['那晚電表下的小木板','plugfuse','matchbox'],
  ticketpunch:['那張票後來塞進哪件外套？','hanger','ticket'],
  spinningtop:['看看矮牆上擱著什麼','slingshot','yoyo'],
  foldingfan:['戲散了，誰還留在座位旁？','castanets','instantphoto'],
  vestacase:['火熄了，誰照亮樓梯？','torch','matchbox'],
  drawerpull:['手在黑暗裡摸到什麼？','torch','key'],
  needlecase:['針尖要靠什麼推過去？','thimble','safetypin'],
  photoslide:['留下的那一格光','film','instantphoto'],
  hanger:['最後一件外套，算進哪一場？','tally','shoelast'],
  tyrelever:['矮牆上那道擦痕','pedal','bikepump'],
  tally:['最後一位客人的票角','ticketpunch','deskbell']
};
const keyChoices = [
  {label:'最後一次回頭看',destination:'film',companion:'notebook',arrival:'搬走前，有人替空下來的廚房拍了最後一張照片。'}
];
const byId = new Map(items.map(item => [item.id,item]));
const objects = document.querySelector('#objects');
const frame = document.querySelector('#frame');
const weatherLabel = document.querySelector('#weather-label');
const weatherNames = {calm:'薄霧',fog:'起霧',wind:'海風',snow:'微雪',clearing:'雨後放晴'};
let weatherScene = '';
const entries = new Map();
const visited = new Set();
const modelModule = import('./scene.js?v=window-scene').catch(() => null);
let current;
let pinned = false;
let returnToKey;

function reveal(entry, lock = false) {
  pinned = Boolean(entry && lock);
  if (current === entry) return;
  if (current) {
    current.article.classList.remove('surfaced');
    current.button.setAttribute('aria-expanded','false');
    current.info.inert = true;
  }
  current = entry;
  if (!entry) return;
  entry.article.classList.add('surfaced');
  entry.button.setAttribute('aria-expanded','true');
  entry.info.inert = false;
}

function mount(item,index) {
  const article = document.createElement('article');
  article.className = 'floating emerging';
  article.addEventListener('animationend', event => {
    if (event.animationName === 'fog-drift') article.classList.remove('emerging');
  });
  article.style.setProperty('--fog-delay', `${index * 130}ms`);
  article.dataset.item = item.id;
  article.innerHTML = `
    <button class="object-button" type="button" aria-expanded="false" aria-controls="story-${item.id}">
      <span class="model" aria-hidden="true"></span>
      <img class="model-still" alt="" src="./${item.id}.png?v=refined-collection">
    </button>
    <p class="glimpse" aria-hidden="true"></p>
    <section class="object-info" id="story-${item.id}" inert>
      <h2></h2>
      <div class="story-trails" role="group" aria-labelledby="trail-${item.id}">
        <p class="trail-label" id="trail-${item.id}">下一件的線索</p>
      </div>
      <p class="object-story"></p>
      <button type="button" class="story-link">失物留言</button>
    </section>`;
  const button = article.querySelector('button');
  const info = article.querySelector('.object-info');
  const modelScope = new AbortController();
  const entry = {article,button,info,modelScope};
  button.setAttribute('aria-label',item.title);
  article.querySelector('h2').textContent = item.title;
  article.querySelector('.glimpse').textContent = item.title + ' · ' + item.story.split('。')[0] + '。';
  info.querySelector('.object-story').textContent = item.story;
  const [label,...neighbors] = trails[item.id];
  const choices = info.querySelector('.story-trails');
  function action(text, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'follow';
    button.textContent = text;
    button.onclick = handler;
    choices.append(button);
    return button;
  }
  function clue(text, handler) {
    const row = document.createElement('div');
    row.className = 'trail-choice';
    const copy = document.createElement('p');
    copy.textContent = text;
    copy.id = 'clue-' + item.id + '-' + choices.children.length;
    const button = action('沿線索找下一件 →',handler);
    button.classList.add('trail-primary');
    button.setAttribute('aria-describedby',copy.id);
    row.append(copy,button);
    choices.append(row);
    return {copy,button};
  }
  if (item.id === 'key') {
    keyChoices.forEach(choice => clue(choice.label,() => chooseKeyTrail(choice)));
  } else {
    entry.clue = clue(label,() => followTrail(item.id,neighbors[0]));
    if (keyChoices.some(choice => choice.destination === item.id)) {
      action('回到鑰匙旁',() => {
        render(returnToKey ?? ['key','postcard','film'],'key');
        entries.get('key').info.querySelector('.follow').focus();
      });
    }
  }
  article.querySelector('.story-link').onclick = () => openEcho(item);
  entries.set(item.id,entry);
  objects.insertBefore(article,objects.children[index] ?? null);
  article.addEventListener('pointerenter',event => {
    if (event.pointerType === 'mouse' && !pinned) article.classList.add('near');
  });
  article.addEventListener('pointerleave',event => {
    if (event.pointerType === 'mouse') article.classList.remove('near');
  });
  button.addEventListener('click',event => {
    if (windowStep !== undefined && windowStep < 5) {
      if (item.id === activeSceneItems[Math.min(2,Math.max(0,windowStep-1))]) advanceWindowScene();
      return;
    }
    reveal(current === entry ? undefined : entry,true);
  });
  article.addEventListener('keydown',event => {
    if (event.key === 'Escape' && current === entry) {
      button.focus();
      reveal();
    }
  });
  const {signal} = modelScope;
  mountInk(article,item,signal);
  modelModule.then(module => module?.floatModel(article.querySelector('.model'),article.querySelector('img'),item.id,index,signal)).catch(() => {});
}

function followTrail(source, destination, branch = false, arrival) {
  const ids = Array.from(objects.children,article => article.dataset.item);
  if (!ids.includes(destination)) {
    const nextSlot = (ids.indexOf(source) + 1) % ids.length;
    ids[nextSlot] = destination;
  }
  const entry = entries.get(source);
  entry.article.classList.remove('near');
  render(ids,undefined,branch);
  connectMemory(source,destination);
  markArrival(destination,arrival);
}

function chooseKeyTrail(choice) {
  returnToKey ??= Array.from(objects.children,article => article.dataset.item);
  followTrail('key',choice.destination,true,choice.arrival);
}

function markArrival(destination,arrival = byId.get(destination).title) {
  const entry = entries.get(destination);
  const glimpse = entry.article.querySelector('.glimpse');
  glimpse.textContent = '下一件在這裡 · ' + arrival;
  glimpse.removeAttribute('aria-hidden');
  entry.button.setAttribute('aria-describedby',glimpse.id = 'arrival-' + destination);
  entry.article.classList.add('arrived');
  entry.button.focus();
}

function render(ids, selected, branch = false) {
  memoryStatus.textContent = '';
  reveal();
  if (!branch && selected !== 'key') returnToKey = undefined;
  for (const [id,entry] of entries) {
    entry.article.classList.remove('arrived');
    entry.button.removeAttribute('aria-describedby');
    const glimpse = entry.article.querySelector('.glimpse');
    const item = byId.get(id);
    glimpse.textContent = item.title + ' · ' + item.story.split('。')[0] + '。';
    glimpse.setAttribute('aria-hidden','true');
    if (ids.includes(id)) continue;
    entry.modelScope.abort();
    entry.article.remove();
    entries.delete(id);
  }
  for (const [index,id] of ids.entries()) {
    visited.add(id);
    const existing = entries.get(id);
    if (!existing) mount(byId.get(id),index);
    else if (objects.children[index] !== existing.article) objects.insertBefore(existing.article,objects.children[index] ?? null);
  }
  reveal(entries.get(selected),Boolean(selected));
  if (latestMemory && !latestMemory.ids.every(id => ids.includes(id))) latestMemory = undefined;
  updateMemoryControls();
  syncMemoryLines();
  const sceneKey = [...ids].sort().join(',');
  if (sceneKey !== weatherScene) {
    weatherScene = sceneKey;
    const choices = [...new Set(ids.map(id => byId.get(id).weather).filter(Boolean))];
    const weather = choices[Math.floor(Math.random()*choices.length)] ?? 'calm';
    frame.dataset.weather = weather;
    if (weatherLabel.textContent !== weatherNames[weather]) weatherLabel.textContent = weatherNames[weather];
  }
}

document.addEventListener('pointerdown',event => {
  if (current && !current.article.contains(event.target) && !event.target.closest('.floating')) reveal();
});
function route() {
  const leavingScene = windowStep !== undefined;
  if (leavingScene) leaveWindowScene();
  const id = location.hash.slice(1);
  if (!leavingScene && entries.has(id)) reveal(entries.get(id),true);
  else if (id === 'key') render(['key','postcard','film'],'key');
  else if (byId.has(id)) render([id,...trails[id].slice(1)],id);
  else render(['key','postcard','film']);
}
addEventListener('hashchange',route);

document.querySelector('#drift').onclick = () => {
  const pool = [...byId.keys()].filter(id => !visited.has(id));
  const next = [];
  function draw(from) {
    while (from.length && next.length < 3) {
      next.push(from.splice(Math.floor(Math.random()*from.length),1)[0]);
    }
  }
  draw(pool);
  if (next.length < 3) {
    visited.clear();
    for (const id of entries.keys()) visited.add(id);
    draw([...byId.keys()].filter(id => !visited.has(id) && !next.includes(id)));
  }
  latestMemory = undefined;
  render(next);
};
const memories = [
  {
    "title": "門口還亮著一盞燈",
    "ids": [
      "umbrella",
      "mitten",
      "clothesbrush"
    ],
    "thread": [],
    "openings": {
      "umbrella": "雨裡摻著一點雪。我把傘往弟弟那邊偏，他只顧看自己踩下去的腳印。我問他冷不冷，他把兩隻手都塞進口袋。",
      "mitten": "弟弟走到樓下才把手伸出來。他左手光著，右手還戴著那隻毛手套。我問左邊那隻呢，他低頭看著自己的袖口。",
      "clothesbrush": "奶奶把衣刷掛在門邊。她聽見腳步就把門打開，叫我先替弟弟刷掉肩上的雪。刷毛缺了一角，刷過去還留了一小撮。"
    },
    "scene": "弟弟到了樓梯口才說，左手那隻手套可能掉在站牌下。「你一路都不說？」我把傘靠到牆邊，想叫他自己回去找。他縮回左手，我才看見拇指凍得發紅。奶奶按亮門燈，拿衣刷替他拂掉肩上的雪。我重新拿起傘，叫他先把手伸進我的口袋。「等暖一點，我們再去。」",
    "endings": {
      "umbrella": "我們回到站牌時，雨已停了。我把傘擱在長椅上，蹲下去照椅底。回家路上，弟弟沒把手伸進自己的口袋。我牽著他走到樓下，才發現把傘留在了長椅上。",
      "mitten": "長椅下只有一團濕紙。回程弟弟把右手的手套脫下來，塞進奶奶的大衣口袋，騰出兩隻手，一邊牽一個。",
      "clothesbrush": "第二天我拿起大衣，肩頭留著一小塊乾掉的水痕。衣刷已經不在門邊，弟弟踮起腳，用掌心替我拍了兩下。"
    }
  },
  {
    "title": "地圖上沒有這條路",
    "ids": [
      "magnifier",
      "compass",
      "notebook"
    ],
    "thread": [],
    "openings": {
      "magnifier": "出門前，朋友用放大鏡把舊地圖上的小字讀給我聽。巷名末尾有一個「井」字，他說：「找到井，就知道有沒有走錯。」",
      "compass": "到了石欄旁，指南針指向山坡。我們低頭看地圖，畫在那個方向的只有一片空白。",
      "notebook": "朋友借我的筆記本第一頁寫著「去找井」。他在下面空了兩行，說回來再填路怎麼走。"
    },
    "scene": "回程車快到了。舊地圖上那條帶「井」字的巷子，到了這裡卻只剩一片空白。我想回站牌，朋友把指南針擱在石欄上，翻給我看筆記本夾著的一張紙。是他母親以前畫的路，終點只寫了「井邊等我」。我把車票折回口袋，陪他順著剛才辨好的方向走。井口早已蓋上木板，上面曬著一雙童鞋。他在筆記本寫下：「看見鞋，就到了。」",
    "endings": {
      "magnifier": "回到借地圖的店，桌子已經擦過，出門前用來讀巷名的放大鏡也不見了。朋友從袋裡抽出筆記本，把「看見鞋」念了一遍。那四個字寫得很大。",
      "compass": "回程我摸了摸口袋，才想起指南針留在石欄上。等我們走回岔口，石欄已經空了。朋友拿著那張紙，往下一站的方向走。他說這段路他母親帶他走過，只是以前他比井口還矮。",
      "notebook": "等下一班車時，他把筆記本擱在長椅上，讓墨慢慢乾。車開了，他才想起那本書和紙條都留在椅上。我把車票翻過來，請他再畫一次。這一回，井口上多了一雙鞋。"
    }
  },
  {
    "title": "石板上最後一圈",
    "ids": [
      "yoyo",
      "spinningtop",
      "slingshot"
    ],
    "thread": [],
    "openings": {
      "yoyo": "廟埕快收攤了，我還蹲著解溜溜球的繩結。弟弟把手掌攤在我面前，裡頭是三顆玻璃珠。他說贏了就分我一顆。",
      "spinningtop": "弟弟把陀螺的繩繞錯方向，解了兩遍。我替他重繞，讓他自己把最後那一截攥進手心。",
      "slingshot": "弟弟把木彈弓擱在矮牆上，鬆掉的橡皮筋垂到牆外。他本來等我替他綁，聽見石板上有東西在轉，拉著我就跑。"
    },
    "scene": "攤主在石板上畫了一圈白線，說陀螺停在線裡就算贏。弟弟那顆沿著石縫偏了出去。我差點伸手替他撥回去，他倒先按住我的手。「它還沒停。」我們蹲著，等它倒在圈外。他問攤主借粉筆，想把陀螺停的地方也圈進去。粉筆在石縫卡了一下，我替他扶著手，兩個人把那一圈畫完。",
    "endings": {
      "yoyo": "回家才發現，溜溜球還擱在石階上。隔天我去找，弟弟也跟來，往我掌心塞了一顆玻璃珠。我問他又沒贏，為什麼還分我。他說昨天那個圈是我替他扶著手畫的。",
      "spinningtop": "收攤時，弟弟先把粉筆還給攤主。回頭再找，陀螺已經不在那條石縫旁。我想牽他回家，他蹲下把白圈缺的一小段用手指補完。",
      "slingshot": "我們回矮牆找彈弓，牆上只剩橡皮筋磨下的一點粉屑。弟弟本來要拿玻璃珠試彈弓，這時卻跑回石板前，把三顆珠子排在新畫的圈裡。他說，這次換它們在裡面。"
    }
  },
  {
    "title": "窗台上少了一個人",
    "ids": [
      "shadow",
      "sprout",
      "smile"
    ],
    "thread": [],
    "openings": {
      "shadow": "搬家車停在巷口時，妹妹還站在窗下。她伸手去碰窗縫，牆上的影子也抬起了手，遠看像在跟誰道別。",
      "sprout": "搬家那天，窗縫裡的種子剛冒出兩片小葉。妹妹拿了張報紙來，說要連根包起來帶走。",
      "smile": "妹妹說要替我拍一張站在舊窗前的照片。我站得太直，她等了一會，索性叫我蹲下去看看窗縫。"
    },
    "scene": "妹妹把報紙攤開，伸手要挖樹芽。我哄她說，下次再回來看它長多高。巷口的搬家車按了喇叭，我才說，房東明早就會把窗縫補起來。她的手停在葉子旁，過了一會才收回去。「那就把它拍進去。」她往後退了一步，把樹芽和牆上的影子都收進取景框。快門響了，我才笑出來。",
    "endings": {
      "shadow": "照片上，我的手正扶著窗，影子倒像在揮手。我把照片貼在新家的窗邊。到了傍晚，這扇窗的光從另一邊照進來。",
      "sprout": "隔週我經過舊家，從巷子裡看見窗縫已補了一道新灰。我回家把相片拿給妹妹看。她伸出兩根手指，在白邊上比了比那兩片葉子的大小。",
      "smile": "妹妹拿筆在照片白邊補了一道小弧線。她說快門按早了半拍，只好把我的笑畫在這裡。後來照片折過一次，折痕正好避開那一筆。"
    }
  },
  {
    "title": "車開以前",
    "ids": [
      "ticket",
      "coin",
      "travelcup"
    ],
    "thread": [],
    "openings": {
      "ticket": "我把回程票折進報紙。妹妹說她已經會看月台號碼了，我就讓她領我過去。",
      "coin": "販賣機把硬幣退回來兩次。妹妹看了看出幣口，問我：「它是不是不收舊的？」",
      "travelcup": "摺疊杯卡在最後一圈。妹妹用兩隻手把它撐開，說她來接水，我只要拿好車票。"
    },
    "scene": "廣播突然換了月台。妹妹收起剛接滿水的杯蓋，指著樓梯叫我往回走。我還盯著舊指示牌，說跟我走就好。樓上響起催促上車的鈴聲，她這次沒等我點頭，拉住我的手就跑。她帶對了路。我們剛坐下，她問：「你剛才是不是也不知道？」我把靠窗的位置讓給她，這才說是。",
    "endings": {
      "ticket": "到了終點，站務員伸出手。我把報紙翻了兩遍，才想起上車後曾把票抽出來，塞進前座的椅袋。妹妹叫我在出口等，自己跑去找站務員說明。她把車次和座號都記得很清楚。",
      "coin": "回到家，我翻遍外套也沒摸到那枚被販賣機退回來的硬幣。妹妹從口袋掏出一枚新的，放到桌上。我把下一班車的時刻表推給她，問她下次想搭幾點的。",
      "travelcup": "車門闔上，我摸到杯蓋，才想起杯身還張在飲水機旁。妹妹問要不要回去拿。月台已經開始往後退。我說下次她帶我來認路時，再去看看。"
    }
  },
  {
    "title": "錄到第三遍",
    "ids": [
      "harmonica",
      "castanets",
      "tape"
    ],
    "thread": [],
    "openings": {
      "harmonica": "弟弟一吹口琴就搶拍。我叫他看我的拇指，等它抬起來再吹。",
      "castanets": "響板的繩結鬆了。我重新綁緊，抬頭時，弟弟已經把最容易吹錯的那兩個音練了三遍。",
      "tape": "我把錄音帶倒到空白處，叫弟弟離麥克風遠一點。他往後退，椅子在地上刮了一聲。"
    },
    "scene": "弟弟吹到一半就沒氣了。他伸手要按停止，我把錄音機往自己這邊挪了半寸，又敲了兩下響板。這回他看著我的拇指，等我抬手才吸氣，把尾音接回去。門外媽媽叫我們吃飯。他湊近還在轉的錄音機說：「等一下，這遍有吹完。」",
    "endings": {
      "harmonica": "吃完飯，他跑回去找口琴，窗台上只有琴盒。他把空盒帶來給我，還比了個要我數拍子的手勢。",
      "castanets": "第二天我回練習室找響板，窗台上只剩一截鬆開的繩頭。弟弟照舊看著我的拇指。沒有響板，我就在桌面上敲了兩下。",
      "tape": "搬家時，錄音機和卡帶分裝。我拆了三箱才找到錄音機，按下播放，裡頭是空的。那句「這遍有吹完」，我倒還記得他的停頓。"
    }
  },
  {
    "title": "坡頂才停下來",
    "ids": [
      "tyrelever",
      "pedal",
      "bikepump"
    ],
    "thread": [],
    "openings": {
      "tyrelever": "弟弟第一次自己撬胎，棒尖從輪框上滑下來，刮出一道白痕。他先看我一眼，才把工具擱到矮牆上。",
      "pedal": "修車師傅把換下的踏板放到木箱上。右角缺了一塊，是我學騎車那年擦的。弟弟伸手去摸那個缺角。",
      "bikepump": "我蹲在巷口打氣，軟管翹著，怎麼繞都收不攏。弟弟扶住車頭，說前輪好了就讓他先騎。"
    },
    "scene": "師傅拍了拍新踏板，叫我們出去試一圈。弟弟一直推到坡頂，卻遲遲不肯跨上去。過了一會，他才問我第一次摔車有沒有哭。我本來想說沒有，低頭看見右鞋上那道擦痕，改口說：「有。我還在地上坐了很久。」他把工具袋擱下，一腳踏上踏板，說：「那你先扶我一下。」",
    "endings": {
      "tyrelever": "試完車，我們折回去收工具。矮牆上只剩撬胎棒擦下的一點白粉。弟弟伸手把白粉抹掉，回家時仍讓我扶著車尾，到了巷口才說可以鬆手。",
      "pedal": "我想把缺角的舊踏板送給弟弟，回到攤前，鐵捲門已經拉下。他把腳放上新踏板，說：「這個也會刮到吧？」我說會。他想了想，還是踩了下去。",
      "bikepump": "我們回巷口收打氣筒，台階只剩一道輪胎印。弟弟問我還要不要扶。我伸手時他已經滑出去兩步，回頭說：「我還在這裡，你慢慢走。」"
    }
  },
  {
    "title": "開幕前的最後一針",
    "ids": [
      "snips",
      "needlecase",
      "thimble"
    ],
    "thread": [],
    "openings": {
      "snips": "開演的鈴已經響過一次，孩子卻把一邊袖子藏在背後。我放下還張著口的剪刀，請她把手伸出來。袖口的縫一路裂到了手肘。",
      "needlecase": "孩子跑來找我時，木針筒的蓋子還擱在桌角。我挑出最短的針。她看了看台口，小聲問：「還來得及嗎？」",
      "thimble": "我在暗處戴上頂針，針尖在小凹點裡卡了一下。站在面前的孩子一動也不敢動，只用眼睛看著幕布。"
    },
    "scene": "我把裂開的袖口往內折。要是一路縫到手肘，孩子就趕不上第一句。她盯著我的手問：「我還能把手舉高嗎？」我只縫住最容易再裂開的那一點，用頂針把最後一針推過厚布，剪短線頭。她試著舉手，袖子裡露出一小段摺痕。台上念到她的名字，我把她的手放下來，說：「留到你說完那句再舉。」",
    "endings": {
      "snips": "我看著她跑上台，才想起剪刀還張著口。回來收桌，布已被捲起，我拆開來，只找到一小截剪落的線。",
      "needlecase": "我把針收回木筒，正想蓋上，就聽見她在台上說出了第一句。散場後桌布被掀走，木筒和那個沒蓋上的蓋子都不在了。",
      "thimble": "她謝幕時把雙手舉得很高。我在後台摸了摸自己的指尖，才發現頂針不見了。隔天翻開針線盒，手還記得它壓過的地方。"
    }
  },
  {
    "title": "交班前的五十五號",
    "ids": [
      "deskbell",
      "roomtag",
      "mirror"
    ],
    "thread": [],
    "openings": {
      "deskbell": "旅館最後一天營業，我替櫃檯值早班。樓上有人拖動椅子，接著鈴響了一下。我從後房出來，櫃檯前站著五十五號的房客。",
      "roomtag": "五十五號的房牌已經鬆了圈。房客把鑰匙拆下來，放在櫃檯上，說房牌還擱在窗台，等一下就上樓拿。",
      "mirror": "五十五號的房客向我借了一面小鏡子。她照到右耳時，把鏡子往左偏了一點，像是早知道鏡面那道細痕會擋住視線。"
    },
    "scene": "她照著小鏡子，把右耳的耳環摘下來放進口袋。她說，以前母親和她住五十五號，每回退房都會為了一只落在窗台的耳環跑上樓。外頭司機按了喇叭，她按住退房單，問我能不能最後替她響一下鈴。我按了一下。她望向樓梯，等那點回聲也散了，才把筆放下。",
    "endings": {
      "deskbell": "打烊後，我回去收櫃檯。鈴的位置留下一圈沒落灰的印子。我伸手按了一下那片木頭，樓上也沒再傳來拖椅子的聲音。",
      "roomtag": "我上樓關窗時，五十五號的房牌還在窗台。車早已走了。我把房牌翻過來，露出沒磨白的那面，讓數字再朝著房裡待一晚。",
      "mirror": "收退房單時，小鏡子已經不在櫃檯，只剩一個空鏡套。我把它拉開又闔上，才想起她朝樓梯望的時候，右耳已經空了。"
    }
  },
  {
    "title": "最後一趟搬箱子",
    "ids": [
      "padlock",
      "accesscard",
      "doorstop"
    ],
    "thread": [],
    "openings": {
      "padlock": "我把舊鐵門上的掛鎖打開，擱在窗台。父親說最後一箱書先別封，裡面還有門牌下拆下來的兩顆螺絲。",
      "accesscard": "新家的感應卡早就領到了。我把它和舊鑰匙塞在同一個口袋，伸手摸時，總是先碰到鑰匙的齒。",
      "doorstop": "最後一趟上樓，我用橡膠門擋撐住走廊的門。父親抱著書箱在後面喊我慢一點，他說過門檻要先把箱子抬高。"
    },
    "scene": "書箱卡在走廊轉角，底下掉出兩顆螺絲。我彎腰去撿，順手把新家的感應卡擱在門邊的平台。父親叫我扶著箱子，自己騰出一隻手，把舊鑰匙留在屋裡的桌上。他走到門外才回頭，問我：「你要再看一下嗎？」我把門擋抽開，站著等那扇門慢慢闔上。",
    "endings": {
      "padlock": "到了樓下，我才想起鎖梁還翹著。父親問我是不是要回去拿，我隔著樓梯看了一眼窗台。那枚掛鎖現在已經沒有哪一扇門需要鎖。",
      "accesscard": "到新家我摸出口袋裡的鑰匙，才想起感應卡還在舊樓。父親陪我在門外坐了一會，把書箱翻過來當椅子。",
      "doorstop": "到樓下我才發現，抽出門擋後，我又順手把它擱在鞋櫃上。原想回去拿，手已伸進口袋，才想起鑰匙也留在裡頭。我把空著的手伸給父親。"
    }
  },
  {
    "title": "舊廚房最後一桌",
    "ids": [
      "spoon",
      "teatin",
      "teaball"
    ],
    "thread": [],
    "openings": {
      "spoon": "搬家車還沒到，母親舀了最後一碗湯給我。湯匙碰到碗邊很輕，她聽見了，隔著空廚房問我還要不要添。",
      "teatin": "我從櫃子深處翻出那只茶罐。蓋子照舊闔不緊，我按了一下，母親說：「就剩一撮，今天泡掉吧。」",
      "teaball": "母親把濾茶球的小環掛在杯耳，叫我別急著收桌。水還沒滾，窗外搬家車已經倒進巷子。"
    },
    "scene": "搬家車在巷口按了喇叭。我拿起還沒喝完的碗，想把湯倒掉。母親把茶罐遞過來，說：「先坐一下。那邊的桌子明天才到。」我把碗放回桌上，將最後一撮茶葉抖進濾茶球。兩杯茶都淡得見底。車又按了一聲，這回是我隔著窗回他：「再等一下。」",
    "endings": {
      "spoon": "第一晚在新家煮湯，我在抽屜裡找了兩遍湯匙。後來才想起收桌時，它還晾在舊家的水槽旁。",
      "teatin": "拆完箱子，我找到了兩個杯子。那只空罐沒跟來。我把杯子靠在一起，原本想拿來壓住罐蓋的那本書，倒還夾在箱底。",
      "teaball": "收桌時水槽裡叮了一聲。隔天新茶買回來，我摸到杯耳，才想起那個小環沒掛回來。新家的第一杯茶，我就讓葉子浮著。"
    }
  },
  {
    "title": "牆上最後一格光",
    "ids": [
      "film",
      "instantphoto",
      "photoslide"
    ],
    "thread": [],
    "openings": {
      "film": "搬家前，我用半卷底片拍廚房。冰箱已經搬走，牆上露出一塊白。我問父親要不要把那塊也拍進去，他說：「先留著，等天黑你就知道了。」",
      "instantphoto": "搬家那天，我在院裡拍了一張空長椅。相紙剛吐出來，父親就隔著窗喊我：「等一下，先別收相機。」他手裡捏著一張小小的紙框。",
      "photoslide": "父親把幻燈片往投影機裡一推，舊家的屋簷就倒掛在廚房牆上。我們都笑了。他拔出紙框，在角落畫了一道鉛筆線。那晚是我們最後一次在這裡開燈。"
    },
    "scene": "樓下催我們搬最後一箱。父親把幻燈片投到冰箱挪走後留下的白牆上。我舉起剛顯影的相紙。兩張照片是同一張長椅，只有牆上那張坐著人。父親說：「那天我等你放學，你從後門走了。」我記得那天。我以為他忘了來。樓下又喊了一聲，我把相紙放低，問父親能不能再看一會。",
    "endings": {
      "film": "他把幻燈片收進紙袋，我則把相機和拍立得塞進箱裡。車到了，我才記起那半卷底片還擱在窗台。我隔著車窗看那扇關起來的窗，總覺得裡面還有一格沒有拍完。",
      "instantphoto": "父親去拔投影機的插頭，我把拍立得帶到院裡，想在白邊寫下日期。筆還沒拿來，風已把相紙吹過矮牆。我踮腳找了兩次，牆那邊只看得見長椅的影子。",
      "photoslide": "收箱前，父親叫我替他把幻燈片取出來。我把紙框擱在窗台，先去樓下扶住搬家車的門。等我想起要回去拿，那扇窗已經鎖上。最後留給我的，是他坐在長椅上等我的樣子。"
    }
  },
  {
    "title": "戲院的往事",
    "ids": [
      "hanger",
      "tally",
      "ticketpunch"
    ],
    "thread": [],
    "openings": {
      "hanger": "戲院最後一晚營業，母親把外套交給我。袖子滑過木衣架磨亮的右肩，她跟平常一樣叮嚀：「別替我掛到最裡面，散場就來拿。」",
      "tally": "我在門口替老闆數最後一場的觀眾。母親來晚了，從街對面朝我揮手。我數到她時拇指停了一下，還是把計數器按了下去。",
      "ticketpunch": "最後一場開演前，母親坐在靠門的位置等我下班。我摸著口袋裡的驗票鉗，答應她散場後一起走。門外這時又跑來一個孩子。"
    },
    "scene": "母親的外套掛在衣帽間最外側。開演鈴已經響了，一個孩子還把票攥在手裡。「我弟發燒，沒來。他想看看沒有剪過的票。」老闆在裡面催我關門。我低頭看了一眼計數器，按進最後一個人，再把鉗口挪開，對著空處按了一下。孩子把票放進胸前的口袋，這才肯把手鬆開。",
    "endings": {
      "hanger": "散場後，母親回來領外套。她在門口等我，我把空衣架推回鐵桿最外側。隔天戲院封門，我來拿便當盒，鐵桿已經拆了。昨天那一支原本掛在哪裡，我還是一眼就認得。",
      "tally": "散場後，老闆叫我把計數器歸零。我轉動側邊的小輪，看四格一起跳回去。母親已經穿好外套在等我。我把計數器留在桌上，走出門時，拇指還在空空的掌心裡按了一下。",
      "ticketpunch": "門要關時，那孩子跑來給我看他的票，票角依然完整。我把驗票鉗擱在櫃檯，去替母親取外套。鉗子忘了帶走，倒是回家好幾天，我還記得那一下打空的力道。"
    }
  },
  {
    "title": "地址上的墨痕",
    "ids": [
      "pencap",
      "inkbottle",
      "envelope"
    ],
    "thread": [],
    "openings": {
      "pencap": "在圖書館寫地址時，妹妹把鋼筆借給我，說郵局再半小時就關門。我匆匆把筆塞進胸袋。跑到街口才發現指尖染了墨，筆蓋留在借書桌上。",
      "inkbottle": "墨水瓶的紙標翹起一角，勾住了我的袖口。妹妹替我壓平它，指著信封右下角說：「外婆的門牌還少一個字。」我們便把瓶子和信一起帶去郵局。",
      "envelope": "信封裡是妹妹寫給外婆的信。我看見她把「我很好」寫了三次。最後一遍寫得特別小。我沒問她為什麼，拿起鋼筆就去填地址。"
    },
    "scene": "妹妹在郵局窗台扶住信封。我用沒蓋的鋼筆蘸墨，補上外婆的門牌。那個字一洇開，她就把信往自己這邊拉。「要不先別寄了？」窗口裡的人伸出手，說今天就收這一封了。妹妹看著信封，低聲告訴我，她最後把「我很好」劃掉，改寫了「我想回去吃飯」。她等墨乾了一點，自己把信推進窗口。",
    "endings": {
      "pencap": "信寄走後，我回圖書館找筆蓋。借書桌擦得很乾淨，連我們把信攤開的位置都看不出來。我把指尖翻過來，那一點墨還留在指紋裡。",
      "inkbottle": "隔天我想抄下同一個地址，筆尖只在紙上刮了兩下。我才想起，櫃員接過信封時，我只顧著牽妹妹出門，把墨水瓶擱在了窗台。那個寫得特別深的字，倒是跟著信寄走了。",
      "envelope": "櫃員收走信封。我才想起答應妹妹把地址抄一份，她卻拉著我說，等外婆回信就知道了。後來信沒等到，那個墨最深的字，我反而記得比整條街名更清楚。"
    }
  },
  {
    "title": "樓梯熄燈那晚",
    "ids": [
      "torch",
      "plugfuse",
      "vestacase"
    ],
    "thread": [],
    "openings": {
      "torch": "樓梯間的燈一下全滅了。門後的孩子喊我照地上，她的鞋掉到下一級。我用指甲推了兩次磨平的滑鈕，手電筒才亮。",
      "plugfuse": "樓梯停電時，父親先把門打開，免得樓下的孩子找不到自己的那一扇。我去按電鈴，什麼聲音也沒有。等電工上樓，我才看見他手裡拿著一枚白瓷保險絲。",
      "vestacase": "父親摸黑把火柴匣塞給我。「粗的那面朝外。」我擦了兩下才亮。火光底下，他的另一隻手還扶著欄杆。樓下有個孩子喊，她看不到鞋。"
    },
    "scene": "電工拆下舊保險絲，叫我把手電筒往電表照。樓下的孩子扶著欄杆，說她一隻腳踩不到鞋，也不敢再下去。我正想把光轉回來，父親說：「你照這裡，我去。」他摸著牆下樓，擦亮一根火柴。火熄前，孩子已經找到鞋。她沒有急著穿，先挪出半級台階，讓父親也能坐下。",
    "endings": {
      "torch": "隔天樓梯燈修好了。孩子站在同一扇門前，這次自己繫好了鞋帶。我伸手去拿手電筒，木板上只剩一層灰。她已經走到街上，鞋帶還好好地繫著。",
      "plugfuse": "電工把舊瓷件交給我，說留著給房東看。我把它擱在電表下。搬走前再經過，燈亮著，白瓷的位置只剩一圈灰。我用指腹沿著圓圈摸了一遍，才把樓梯的燈關上。",
      "vestacase": "燈亮時，孩子已經把鞋穿好。她問父親，火柴這麼短，怎麼還敢往樓下走。父親把空匣擱在窗台，說：「你剛才有叫我。」後來匣子不見了，我倒還記得她在黑暗裡喊的那一聲。"
    }
  }
];
const memoryControls = document.querySelector('#theater-controls');
const memoryStatus = document.querySelector('#thread-status');
const readMemoryButton = document.querySelector('#read-memory');
const archiveButton = document.querySelector('#memory-archive-button');
const archiveDialog = document.querySelector('#memory-archive');
const archiveList = archiveDialog.querySelector('ul');
const collectedMemories = [];
let latestMemory;
const memoryExits = {
  umbrella:['hanger','看看門邊掛大衣的木衣架'],
  magnifier:['postcard','看看那張沒寄出的明信片'],
  yoyo:['tally','看看替人數數的計數器'],
  shadow:['instantphoto','看看窗前那張拍立得'],
  ticket:['luggage','看看掉下的行李牌'],
  harmonica:['earbuds','循著聲音去找耳機'],
  tyrelever:['slingshot','看看矮牆旁的木彈弓'],
  snips:['hanger','看看後台的木衣架'],
  deskbell:['accesscard','看看另一張門禁卡'],
  padlock:['luggage','看看箱上的行李牌'],
  spoon:['travelcup','看看帶上路的杯子'],
  film:['tape','看看窗邊的錄音帶'],
  hanger:['ticket','看看沒有剪角的車票'],
  pencap:['postcard','看看另一封寄出的消息'],
  torch:['doorstop','看看那扇門旁的門擋']
};
const threadLines = document.querySelector('#thread-lines');
const threadStory = document.querySelector('#thread-story');
const memoryLinks = new Map();

function connectMemory(source,destination) {
  const memory = memories.find(({ids}) => ids.includes(source) && ids.includes(destination));
  if (!memory) return;
  const key = [source,destination].sort().join(',');
  if (!memoryLinks.has(key)) memoryLinks.set(key,{source,destination});
  syncMemoryLines();

  if (memory.thread.length === 3) return;
  for (const id of [source,destination]) {
    if (!memory.thread.includes(id)) memory.thread.push(id);
  }
  memoryControls.hidden = false;
  if (memory.thread.length < 3) {
    memoryStatus.textContent = `「${memory.title}」已串起兩件失物。`;
    return;
  }
  collectedMemories.unshift(memory);
  latestMemory = memory;
  memoryStatus.textContent = `「${memory.title}」可以閱讀了。`;
  updateMemoryControls();
}

function syncMemoryLines() {
  for (const link of memoryLinks.values()) {
    const {source,destination} = link;
    if (!entries.has(source) || !entries.has(destination)) {
      link.path?.remove();
      link.path = undefined;
      continue;
    }
    if (link.path) continue;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    link.path = path;
    threadLines.append(path);
    function trace() {
      if (!path.isConnected) return;
      const area = frame.getBoundingClientRect();
      const a = entries.get(source).button.getBoundingClientRect();
      const b = entries.get(destination).button.getBoundingClientRect();
      const x = a.left+a.width/2-area.left, y = a.top+a.height/2-area.top;
      const u = b.left+b.width/2-area.left, v = b.top+b.height/2-area.top;
      path.setAttribute('d',`M ${x} ${y} Q ${(x+u)/2+8} ${(y+v)/2+13} ${u} ${v}`);
      requestAnimationFrame(trace);
    }
    trace();
  }
}

function updateMemoryControls() {
  readMemoryButton.hidden = !latestMemory;
  readMemoryButton.textContent = latestMemory ? `讀這段往事｜${latestMemory.title}` : '';
  archiveButton.hidden = !collectedMemories.length;
  archiveButton.textContent = `拾得的往事 · ${collectedMemories.length}`;
  memoryControls.hidden = !latestMemory && !collectedMemories.length;
  for (const memory of collectedMemories) {
    const [destination,label] = memoryExits[memory.ids[0]];
    for (const id of memory.ids) {
      const clue = entries.get(id)?.clue;
      if (!clue) continue;
      const {copy,button} = clue;
      copy.textContent = label;
      button.onclick = () => {
        latestMemory = undefined;
        followTrail(id,destination);
      };
    }
  }
}

function readMemory(memory) {
  threadStory.querySelector('h2').textContent = memory.title;
  const paragraphs = [memory.openings[memory.thread[0]],memory.scene,memory.endings[memory.thread[2]]].map(copy => {
    const p = document.createElement('p');
    p.textContent = copy;
    return p;
  });
  threadStory.querySelector('.thread-copy').replaceChildren(...paragraphs);
  threadStory.showModal();
}

readMemoryButton.onclick = () => readMemory(latestMemory);
archiveButton.onclick = () => {
  archiveList.replaceChildren(...collectedMemories.map(memory => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = memory.title;
    button.onclick = () => {
      archiveDialog.close();
      readMemory(memory);
    };
    item.append(button);
    return item;
  }));
  archiveDialog.showModal();
};

const windowScene = document.querySelector('#window-scene');
const windowSet = document.querySelector('#window-set');
const sceneLine = document.querySelector('#scene-line');
const sceneNext = document.querySelector('#scene-next');
const windowSteps = [
  ['拖曳或翻面，看看白瓷背後留下什麼。','翻到背面'],
  ['快門響了，我才笑出來。那時，牆上還留著我的影子。','看看牆上的影子 →'],
  ['牆上的手像在道別。走近才看見，她伸手是為了碰窗縫裡的葉子。','看看窗縫裡的小樹芽 →'],
  ['妹妹想把小樹芽帶走。搬家車按了喇叭，哥哥才說，房東明早就要補窗縫。','重現那一刻'],
  ['妹妹收回手，舉起相機：「那就把它拍進去。」快門響了，哥哥才笑出來。','讀完整往事'],
  ['點開一件失物，為它上色或留一句話。','前往下一個現場 →']
];
let windowStep;
let windowFlipTimer;
const windowItems = ['smile','shadow','sprout'];
const doorwayItems = ['umbrella','mitten','clothesbrush'];
const doorwaySteps = [
  ['到樓下了。弟弟還把左手藏在袖子裡。','收起傘'],
  ['「手套呢？」他這才把凍紅的手伸出來：「可能掉在站牌下。」','看看落單的手套 →'],
  ['門燈啪一聲亮了。奶奶看了看他的肩頭：「先把雪刷掉。」','拿起門邊的衣刷 →'],
  ['奶奶把傘拿回來，騰出一隻手牽他。我拉開大衣口袋，讓他先暖一暖。','重現回家的路'],
  ['站牌下只剩一團濕紙。手套沒找回來。回家時，他兩隻手都有人牽。','讀完整往事'],
  ['點開失物，看看它還留下了什麼。','進入自由探索 →']
];
let activeSceneItems = windowItems;

function startDoorwayScene() {
  activeSceneItems = doorwayItems;
  frame.dataset.scene = 'doorway';
  windowScene.setAttribute('aria-label','第二個失物現場');
  windowScene.querySelector('h1').textContent = '門口還亮著一盞燈';
  const number = windowScene.querySelector('.scene-number');
  if (number) number.textContent = '失物現場 02';
  showWindowStep(0);
  render(doorwayItems.slice(0,1));
}

function showWindowStep(step) {
  windowStep = step;
  frame.dataset.windowStep = step;
  const [line,action] = (activeSceneItems === doorwayItems ? doorwaySteps : windowSteps)[step];
  sceneLine.textContent = line;
  sceneNext.textContent = action;
}

function revealSmileClue() {
  if (windowStep !== 0) return;
  clearTimeout(windowFlipTimer);
  sceneNext.disabled = false;
  showWindowStep(1);
}

function advanceWindowScene() {
  switch (windowStep) {
    case 0: {
      if (activeSceneItems === doorwayItems) {
        showWindowStep(1);
        break;
      }
      if (sceneNext.disabled) return;
      const entry = entries.get('smile');
      entry.article.classList.add('turned');
      entry.button.dispatchEvent(new Event('lost:flip'));
      sceneNext.disabled = true;
      windowFlipTimer = setTimeout(revealSmileClue, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 580);
      break;
    }
    case 1:
      showWindowStep(2);
      render(activeSceneItems.slice(0,2));
      connectMemory(activeSceneItems[0],activeSceneItems[1]);
      break;
    case 2:
      showWindowStep(3);
      render(activeSceneItems);
      connectMemory(activeSceneItems[1],activeSceneItems[2]);
      break;
    case 3:
      showWindowStep(4);
      break;
    case 4:
      showWindowStep(5);
      readMemory(latestMemory);
      break;
    case 5:
      if (activeSceneItems === doorwayItems) location.hash = 'umbrella';
      else startDoorwayScene();
      break;
  }
}

function leaveWindowScene() {
  clearTimeout(windowFlipTimer);
  windowStep = undefined;
  delete frame.dataset.windowStep;
  delete frame.dataset.scene;
  windowScene.hidden = windowSet.hidden = true;
  document.querySelector('#drift').hidden = false;
}

sceneNext.onclick = advanceWindowScene;
document.querySelector('#scene-explore').onclick = () => { location.hash = activeSceneItems[0]; };
if (location.hash) {
  route();
} else {
  windowScene.hidden = windowSet.hidden = false;
  document.querySelector('#drift').hidden = true;
  showWindowStep(0);
  render(['smile']);
  entries.get('smile').button.addEventListener('lost:back',revealSmileClue);
}
