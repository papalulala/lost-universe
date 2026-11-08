import { openEcho } from './echo.js?v=lost-messages';
import { mountInk } from './ink.js?v=sixty-nine';

const items = [
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
  {id:'vestacase',title:'底部磨亮的火柴匣',tag:'搬家後留下的東西',story:'停電時，父親讓我摸火柴匣的底。「粗的那面朝外。」我擦了兩次才亮，火光照見匣底有一道被磨得發亮的地方。燈一亮，他把匣子擱到窗台上，順手把火吹熄。\n\n多年後回去交鑰匙，我伸手摸那個窗台。漆刷過一層又一層，原來放匣子的地方摸起來一樣平。'}
];

const trails = {
  key:['搬家後留下的東西','shoehorn','film'],
  postcard:['還沒寄出的那句話','envelope','notebook'],
  film:['還沒來得及看清的畫面','instantphoto','curtainring'],
  spoon:['舊廚房還留著什麼？','teatin','teaball'],
  button:['穿過那四個孔的針','thimble','notebook'],
  ticket:['那個原本要剪掉的角','ticketpunch','coin'],
  comb:['耳後還留著什麼？','hairclip','mirror'],
  notebook:['替讀到一半的地方做記號','bookmark','postcard'],
  umbrella:['一隻手撐傘，另一隻手找零錢','mitten','ticket'],
  tape:['那句「等一下」，有人聽見嗎？','earbuds','film'],
  stamp:['第三刀之後，還有一筆','notebook','tape'],
  eraser:['口袋裡剩下的一點碎屑','pencil','button'],
  mirror:['雨停了，玻璃上還留著什麼？','glasses','umbrella'],
  bookmark:['翻到還沒讀完的那一頁','notebook','tape'],
  envelope:['地址還能從哪裡找回來？','postcard','ticket'],
  luggage:['提把上的勒痕，手腕上的淡痕','watch','ticket'],
  earbuds:['線的另一頭接著什麼？','phone','tape'],
  pencil:['鉛筆寫過的地方，還留著什麼？','eraser','button'],
  thimble:['順著那截沒收好的線','darner','spool'],
  watch:['上車後，才發現少了一樣','luggage','ticket'],
  matchbox:['燈還沒亮起來時','vestacase','plugfuse'],
  glasses:['得湊近才看得清','magnifier','mirror'],
  mitten:['進門前的大衣','clothesbrush','button'],
  bell:['修車攤上還留了什麼？','pedal','whistle'],
  spool:['那截沒捲回去的線','yoyo','shuttle'],
  whistle:['聲音一停，手還會去找','harmonica','bell'],
  coin:['車一來，有什麼沒跟上？','ticket','luggage'],
  clothespin:['被扯鬆的那一截線','spool','thimble'],
  pencap:['手指上的那一點墨','inkbottle','dater'],
  safetypin:['裙襬後來用什麼縫上？','thimble','spool'],
  shoehorn:['留下來的鞋跟形狀','shoelast','padlock'],
  domino:['下一局拿什麼當籌碼？','bottlecap','coin'],
  bottlecap:['手一鬆，原本捏著的東西去哪了？','cankey','domino'],
  teaball:['杯子旁少了什麼？','travelcup','spoon'],
  shuttle:['布邊還牽著哪一截線？','spool','clothespin'],
  doorstop:['門闔上以後','shoehorn','key'],
  harmonica:['最後那一聲，停在哪裡？','deskbell','castanets'],
  curtainring:['窗台上還留著什麼？','film','envelope'],
  dater:['借書時留下的記號','pencap','bookmark'],
  magnifier:['沿著地圖上的折痕','compass','luggage'],
  darner:['收拾針線以前','snips','thimble'],
  pedal:['騎出去試車以前','bikepump','bell'],
  measure:['尺寸還沒記下來','foldrule','watch'],
  yoyo:['還有一截線沒收好','spinningtop','slingshot'],
  teatin:['倒完最後一撮茶之後','teaball','spoon'],
  padlock:['那扇門後來怎麼開？','accesscard','key'],
  castanets:['散場後留下的聲音','foldingfan','harmonica'],
  cankey:['罐子開了，手裡還有什麼？','bottlecap','teatin'],
  clothesbrush:['大衣上還沾著什麼？','mitten','button'],
  hairclip:['耳邊少了什麼？','comb','earbuds'],
  plugfuse:['燈熄掉後，手摸到哪裡？','torch','matchbox'],
  slingshot:['還垂著一截，沒來得及收好','yoyo','castanets'],
  travelcup:['匆匆離開前，還有什麼沒收好？','teaball','ticket'],
  bikepump:['再騎一段就知道了','pedal','bell'],
  shoelast:['腳跟還記得的形狀','shoehorn','darner'],
  deskbell:['退房後，還有什麼沒還？','roomtag','key'],
  compass:['走到一半，還想記下什麼？','magnifier','postcard'],
  accesscard:['口袋裡還剩什麼？','key','ticket'],
  phone:['那句話後來有寄出去嗎？','postcard','envelope'],
  instantphoto:['畫面還沒看清的時候','film','glasses'],
  snips:['布捲起來以後','shuttle','safetypin'],
  foldrule:['量過的那道門框','measure','pencil'],
  roomtag:['退房時，手裡還剩什麼？','key','deskbell'],
  inkbottle:['那個顏色特別深的字','envelope','pencap'],
  torch:['那晚電表下的小木板','plugfuse','matchbox'],
  ticketpunch:['那張沒有剪角的票','ticket','travelcup'],
  spinningtop:['繩頭還攥在手裡','yoyo','slingshot'],
  foldingfan:['戲散了，誰還留在座位旁？','castanets','instantphoto'],
  vestacase:['燈亮以前的那一下','matchbox','torch']
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
const modelModule = import('./scene.js?v=sixty-nine').catch(() => null);
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
      <h2></h2><p></p>
      <button type="button" class="story-link">失物留言</button>
      <div class="story-trails"></div>
    </section>`;
  const button = article.querySelector('button');
  const info = article.querySelector('.object-info');
  const modelScope = new AbortController();
  const entry = {article,button,info,modelScope};
  button.setAttribute('aria-label',item.title);
  article.querySelector('h2').textContent = item.title;
  article.querySelector('.glimpse').textContent = item.title + ' · ' + item.story.split('。')[0] + '。';
  info.querySelector('p').textContent = item.story;
  const [label,...neighbors] = trails[item.id];
  const choices = info.querySelector('.story-trails');
  function action(text, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'follow';
    button.textContent = text;
    button.onclick = handler;
    choices.append(button);
  }
  if (item.id === 'key') {
    keyChoices.forEach(choice => action(choice.label,() => chooseKeyTrail(choice)));
  } else {
    action(label,() => {
      render([item.id,...neighbors],item.id);
      entries.get(item.id).button.focus();
    });
    if (keyChoices.some(choice => choice.destination === item.id)) {
      action('回到鑰匙旁',() => {
        render(returnToKey ?? ['key','postcard','film'],'key');
        entries.get('key').info.querySelector('.follow').focus();
      });
    }
  }
  article.querySelector('.story-link').onclick = () => openEcho(item);
  entries.set(item.id,entry);
  objects.append(article);
  article.addEventListener('pointerenter',event => {
    if (event.pointerType === 'mouse' && !pinned) article.classList.add('near');
  });
  article.addEventListener('pointerleave',event => {
    if (event.pointerType === 'mouse') article.classList.remove('near');
  });
  button.addEventListener('click',event => {
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

function chooseKeyTrail(choice) {
  const ids = Array.from(objects.children,article => article.dataset.item);
  returnToKey ??= ids;
  const others = [choice.destination,choice.companion];
  render(ids.map(id => id === 'key' ? id : others.shift()),undefined,true);
  const entry = entries.get(choice.destination);
  const glimpse = entry.article.querySelector('.glimpse');
  glimpse.textContent = choice.arrival;
  glimpse.removeAttribute('aria-hidden');
  entry.button.setAttribute('aria-describedby',glimpse.id = 'arrival-' + choice.destination);
  entry.article.classList.add('arrived');
  entry.button.focus({preventScroll:true});
  entry.article.scrollIntoView({block:'nearest',behavior:'instant'});
}

function render(ids, selected, branch = false) {
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
    if (existing) objects.append(existing.article);
    else mount(byId.get(id),index);
  }
  reveal(entries.get(selected),Boolean(selected));
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
  const id = location.hash.slice(1);
  if (entries.has(id)) reveal(entries.get(id),true);
  else if (id === 'key') render(['key','postcard','film'],'key');
  else if (byId.has(id)) render([id,...trails[id].slice(1)],id);
  else render(['key','postcard','film']);
}
addEventListener('hashchange',route);
route();
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
  render(next);
};











































